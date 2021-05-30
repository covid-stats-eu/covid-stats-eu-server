import JoiBase from 'joi'
import JoiDate from '@joi/date'
const Joi = JoiBase.extend(JoiDate);

const schema = Joi.object({
    country: Joi.string()
        .min(3)
        .max(3)
        .messages({
            'string.min': `"country" must be ISO 3166-1 alpha-3 country code`,
            'string.max': `"country" must be ISO 3166-1 alpha-3 country code`,
        }),
    cases: Joi.number().positive().allow(0),
    deaths: Joi.number().positive().allow(0),
    tests: Joi.number().positive().allow(0),
    startDate: Joi.date().format('YYYY-MM-DD').utc(),
    endDate: Joi.date().format('YYYY-MM-DD').utc()
});

export default schema;