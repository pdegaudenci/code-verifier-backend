/* eslint-disable quotes */
import { Get, Query, Route, Tags } from "tsoa"
import { BasicResponse } from "./types"
import { IHelloController } from "./interfaces"
import { LogSucess } from "../utils/logger"

@Route("/api/hello")
@Tags("helloController")
export class HelloController implements IHelloController {
    // eslint-disable-next-line space-before-function-paren
    /**
     * Endpoint to retrieve a message  "Hello ${name}" in JSON
     * @param name {string} Name of user
     * @returns {BasicResponse} Promise of BasicResponse
     */
    @Get("/")
    public async getMessage(@Query() name?: string): Promise<BasicResponse> {
        LogSucess('[/api/hello] Get Request')

        return {
            message: `Hello ${name || "world"}`
        }
    }
}
