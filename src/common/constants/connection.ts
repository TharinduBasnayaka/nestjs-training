export const connection: Connection = {
  CONNECTION_STRING: 'mysql://test123/port:3306',
  DB: 'MYSQL',
  DBNAME: 'TEST',
};

export type Connection = {
  CONNECTION_STRING: string;
  DB: string;
  DBNAME: string;
};
