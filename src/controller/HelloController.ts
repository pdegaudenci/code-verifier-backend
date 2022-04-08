/* eslint-disable quotes */
import { BasicResponse } from "./types"
import { IHelloController } from "./interfaces"
import { LogSucess } from "../utils/logger"

export class HelloController implements IHelloController {
    // eslint-disable-next-line space-before-function-paren
    public async getMessage(name?: string): Promise<BasicResponse> {
        LogSucess('[/api/hello] Get Request')

        return {
            message: `Hello ${name || "world"}`
        }
    }
}
