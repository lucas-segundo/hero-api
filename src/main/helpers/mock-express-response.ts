import { createMock } from '@golevelup/ts-jest'
import { Response } from 'express'

export const mockExpressResponse = () =>
  createMock<Response>({
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  })
