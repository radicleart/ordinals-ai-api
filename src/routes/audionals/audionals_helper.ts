import * as pitchfinder from "pitchfinder";
import * as fs from 'fs';
import MidiWriter from 'midi-writer-js';
import { getConfig } from "../../lib/config";
import { parse } from 'node-html-parser';
import wav from 'node-wav';

export async function collect(inscriptionId:string) {
    const filePath = `/tmp/${inscriptionId}.mid`;
    const wavData = fs.readFileSync(filePath);
    return wavData;
}

export async function process(inscriptionId:string) {
  const audioSrc = await saveAudioAsFile(inscriptionId)
  //const filePath = `/tmp/${inscriptionId}.wav`;
  //const wavData = fs.readFileSync(filePath);

  const base64Data = audioSrc.split(',')[1]; // Extract the Base64-encoded data
  const binaryData = atob(base64Data); // Decode Base64 data to binary

  // Convert binary data to a Uint8Array
  const bytes = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
      bytes[i] = binaryData.charCodeAt(i);
  }

// Decode WAV data
  const audioData = wav.decode(bytes.buffer);
  const audioSamples = audioData.channelData[0]; // Assuming mono audio

  // Pitch detection
  const detectors = [pitchfinder.AMDF()];

  const pitchDetection = pitchfinder.frequencies(detectors, audioSamples, {
      tempo: 120,
      quantization: 1
  });

  // Generate MIDI events
  const midiEvents = pitchDetection.map((pitch, index) => {
    const note = pitchToMidi(pitch); // Use the pitch directly as the frequency
    const timestamp = index * 1000; // Example: timestamp in milliseconds
    return { note, timestamp };
  });

  // Create MIDI track
  const track = new MidiWriter.Track();
  track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: 1 }));
  midiEvents.forEach(event => {
    track.addEvent(new MidiWriter.NoteEvent({
        pitch: [event.note],
        duration: '8', // Adjust as needed
        velocity: 100,
        startTick: event.timestamp // Use the calculated timestamp
    }));
  });

  // Create MIDI file
  const writer = new MidiWriter.Writer([track]);
  const midiData = writer.buildFile();

  // Write MIDI file
  fs.writeFileSync(`/tmp/${inscriptionId}.mid`, midiData, 'binary');

  console.log('MIDI file generated successfully.');

  console.log(audioData)

}

async function saveAudioAsFile(inscriptionId:string) {
  try {
    const url = `${getConfig().inscriptionsApi1}/content/${inscriptionId}`
    const response = await fetch(url);
    const result:any = await response.text();
    const audioSrc = parseAudio(result)
    fs.writeFileSync(`/tmp/${inscriptionId}.wav`, audioSrc, {encoding: 'utf8'});
    return audioSrc
  } catch (err:any) {
    console.log('err indexSbtcEvent: ' + err);
    return
  }
}

function parseAudio(htmlFile:string) {
  const doc = parse(htmlFile);
  const audioSrc = doc.getElementById("audionalData")?.getElementsByTagName('source')[0].getAttribute('src') || ''
  return audioSrc;
}

// Function to convert pitch values to MIDI note numbers
function pitchToMidi(pitch:number) {
  // Convert pitch (in Hz) to MIDI note number
  if (pitch === 0) {
      return -1; // Represent silence or no pitch detected
  } else {
      return Math.round(69 + 12 * Math.log2(pitch / 440));
  }
}


// MIDI note number to frequency conversion function
function midiToFrequency(note:number) {
  return 440 * Math.pow(2, (note - 69) / 12);
}
