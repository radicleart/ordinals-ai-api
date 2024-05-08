export type QA = {
    question: string;
    answer?: string;
}

export type ConfigI = {
	mongoDbUrl: string; 
	mongoUser: string; 
	mongoPwd: string; 
	mongoDbName: string; 
	host: string;
	port: number;
	inscriptionsApi1: string;
	inscriptionsApi2: string;
  };
