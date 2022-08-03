import { GRPC } from '../../config';

const grpc = require('grpc');
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./external/grpc/proto/wallet.proto', options);
const notesProto = grpc.loadPackageDefinition(packageDefinition);

const NoteService = notesProto.wallet.Wallet;

export const clientWallet = new NoteService(GRPC.wallet,
  grpc.credentials.createInsecure()
);
