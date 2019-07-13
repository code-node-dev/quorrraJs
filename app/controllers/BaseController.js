class BaseController {

    static successResponseData(data, status_code = 200, message, res, extras) {

        let response = {
            "data": data,
            "meta": {

                "status": status_code,
                "message": message,
            }
        };

        if (extras) {
            for (var k in extras) {
                response.meta.perPage = extras['per_page']
                response.meta.page = extras['page']
                response.meta.total = extras['total']
            }
        }

        return res.send(response);
    }

    static errorResponseData(message, res, status_code = 400) {
        let response = {
            "status": status_code,
            "message": message
        };
        return res.send(response);
    }

    static validationErrorResponseData(validMessage, res, status_code = 400) {

        let response = {
            "status": status_code,
            "message": validMessage
        }
        return res.status(status_code).send(response);
    }

}
module.exports = BaseController;