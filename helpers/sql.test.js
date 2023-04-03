const { BadRequestError } = require('../expressError');
const { sqlForPartialUpdate } = require('./sql'); 

describe('sqlForPartialUpdate', () => {
    test('constructs proper object', () => {
        const data = {
            num_employees: 15,
            logo_url: 'img.com'
        };
        const columns = {
            numEmployees: "num_employees",
            logoUrl: "logo_url",
        };
        const {setCols, values} = sqlForPartialUpdate(data, columns);
        expect(setCols).toEqual('\"num_employees\"=$1, \"logo_url\"=$2');
        expect(values).toEqual([15, 'img.com']);
    });
    test('throws error', () => {
        try {
            const data = {};
            const columns = {
                numEmployees: "num_employees",
                companyLogo: "logo_url",
            };            sqlForPartialUpdate(data, columns )
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
})