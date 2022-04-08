import { BasicResponse, OutputResponse } from '../types'

export interface IHelloController {
    getMessage(name?: string): Promise<BasicResponse>
}

export interface IGoodbyController {
    getMessage(name?: string): Promise<OutputResponse>
}
