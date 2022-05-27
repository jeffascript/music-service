import errorMiddleware from '../../middleware/error.middleware';
import { checkReqParam } from '../../middleware/checkParam.middleware';

test('responds with 404 When no URL params is available', () => {
    const req: any = {
        params: '',
        json: jest.fn(() => req),
        status: jest.fn(() => req),
    };

    const res: any = {
        send: jest.fn(() => res),
        status: jest.fn(() => res),
    };
    const next = jest.fn();
    const error = {
        status: 400,
        message: 'Missing mbid search string',
        name: 'error',
    };

    checkReqParam(req, res, next);
    errorMiddleware(error, req, res, next);
    expect(req.params.mbid).toBeUndefined();
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
        status: error.status,
        message: error.message,
    });
    expect(res.send).toHaveBeenCalledTimes(1);
});
