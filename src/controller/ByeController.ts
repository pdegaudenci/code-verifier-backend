import { OutputResponse } from './types'
import { LogSucess } from '../utils/logger'
import { IGoodbyController } from './interfaces'

export class ByeController implements IGoodbyController {
    public async getMessage(name?: string): Promise<OutputResponse> {
        LogSucess('[/api/goodbye] Get Request')

        return {
            message: `Goodbye ${name || 'world'}`,
            date: new Date()
        }
    }
}
