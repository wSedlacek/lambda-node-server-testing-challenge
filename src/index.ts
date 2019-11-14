import { server } from "./api/server";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));
