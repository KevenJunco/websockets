import { server } from "./http";
import "../src/websocket/ChatService";
server.listen(3000, () => console.log('Server started 🚀'))