'use strict'

const data1 = require('./data');

exports.getData = (req, res) => {

    try {
        const data = data1;
        res.status(200).json({
            message: 'My Rule-Validation API',
            status: 'success',
            data
        })

    } catch (error) {
        res.status(400).json({
            status: 'error',
            error: 'Something went wrong',
            details: error.stack
        })
    };

};

exports.validateData = (req, res) => {
    try {

        // Handling PayLoad Error::
        if (!req.body && Object.keys(req.body).length === 0) {
            res.status(400).json({
                message: "Invalid JSON payload passed.",
                status: "error",
                data: null
            })
        };

        if (typeof req.body !== 'object') {
            res.status(400).json({
                message: "Invalid JSON payload passed.",
                status: "error",
                data: null
            })
        };

        // Getting rule and data from the request body
        const { rule, data } = req.body;

        // All Required Fields::
        const ruleFields = ['field', 'condition', 'condition_value'];
        ruleFields.forEach(field => {

            if (!req.body.rule[field] || req.body.rule[field].length === 0) {
                res.status(400).json({
                    message: `${field} is required.`,
                    status: "error",
                    data: null
                })
            }

            // The 'field' property must be a string data type
            if (field === 'field' && typeof req.body.rule[field] !== 'string') {
                res.status(400).json({
                    message: `${field} should be a string type.`,
                    status: "error",
                    data: null
                })
            }


            // The 'condition' property's value can only be either 'eq', 'neq', 'gt' or 'gte'
            if (field === 'condition') {
                const strictValues = ['eq', 'neq', 'gt', 'gte'];
                const value = req.body.rule[field];
                // The Array.indexOf() method searches the array for a value and returns -1 if it doesn't exist in the array.
                if (strictValues.indexOf(value) === -1) {
                    res.status(400).json({
                        message: `${field} should be either 'eq', 'neq', 'gt' or 'gte'.`,
                        status: "error",
                        data: null
                    })
                }
            }

            // The 'condition_value' property must have a number data type
            if (field === 'condition_value' && typeof req.body.rule[field] !== 'number') {
                res.status(400).json({
                    message: `${field} should be a number type.`,
                    status: "error",
                    data: null
                })
            }

        });

        // If the 'rule' object is not specified in the request body::
        if (!rule) {
            res.status(400).json({
                message: "rule is required.",
                status: "error",
                data: null
            })
        };

        // If the 'data' object is not specified in the request body::
        if (!data) {
            res.status(400).json({
                message: "data is required.",
                status: "error",
                data: null
            })
        };

        // If the 'rule' property specified in the request body is not an object
        if (typeof rule !== 'object') {
            res.status(400).json({
                message: "rule should be an object.",
                status: "error",
                data: null
            })
        };

        // The 'data' property in the request body can only be either an object, an array or a string
        const dataTypes = ['object', 'array', 'string'];
        if (dataTypes.indexOf(typeof(data)) === -1) {
            res.status(400).json({
                message: "data should be either an object, array or string.",
                status: "error",
                data: null
            })
        };

        // If data is a String
        const dataValue = ['name', 'crew', 'age', 'position', 'missions'];
        if ((dataValue.indexOf(rule.field) === -1) && typeof(data) === 'string') {
            res.status(400).json({

                message: `field ${rule.field}  failed validation.`,
                "status": "error",
                "data": {
                    validation: {
                        error: true,
                        field: rule.field,
                        field_value: data.missions,
                        condition: rule.condition,
                        condition_value: rule.condition_value
                    }
                }

            })
        };

        // If data is an Array
        if ((dataValue.indexOf(rule.field) === -1) && (data instanceof Array)) {
            return res.status(400).json({
                message: `field ${rule.field} is missing from data.`,
                status: "error",
                data: null
            })
        };


        // 'EQ'::
        // FIELD VALUE SHOULD BE EQUAL TO THE CONDITION VALUE
        if (rule.condition === 'eq') {
            if (data.missions == rule.condition_value) {
                res.status(200).json({
                    message: `field ${rule.field} successfully validated.`,
                    status: "success",
                    data: {
                        validation: {
                            error: false,
                            field: rule.field,
                            field_value: data.missions,
                            condition: rule.condition,
                            condition_value: rule.condition_value
                        }

                    }

                })
            } else {
                res.status(400).json({
                    message: `field ${rule.field} failed validation.`,
                    status: "error",
                    data: {
                        validation: {
                            error: true,
                            field: rule.field,
                            field_value: data.missions,
                            condition: rule.condition,
                            condition_value: rule.condition_value
                        }
                    }

                })
            }
        };


        // 'NEQ':::
        // FIELD VALUE SHOULD NOT BE EQUAL TO THE CONDITION VALUE
        if (rule.condition === 'neq') {
            if (data.missions !== rule.condition_value) {
                res.status(200).json({
                    message: `field ${rule.field} successfully validated.`,
                    status: "success",
                    data: {
                        validation: {
                            error: false,
                            field: rule.field,
                            field_value: data.missions,
                            condition: rule.condition,
                            condition_value: rule.condition_value
                        }
                    }
                })

            } else {
                res.status(400).json({
                    message: `field ${rule.field} failed validation.`,
                    status: "error",
                    data: {
                        validation: {
                            error: true,
                            field: rule.field,
                            field_value: data.missions,
                            condition: rule.condition,
                            condition_value: rule.condition_value
                        }
                    }

                })
            }
        };


        // 'GT':::
        // FIELD VALUE SHOULD BE GREATER THAN THE CONDITION VALUE
        if (rule.condition === 'gt') {
            if (data.missions > rule.condition_value) {
                res.status(200).json({
                    message: `field ${rule.field} successfully validated.`,
                    status: "success",
                    data: {
                        validation: {
                            error: false,
                            field: rule.field,
                            field_value: data.missions,
                            condition: rule.condition,
                            condition_value: rule.condition_value
                        }
                    }

                })
            } else {
                res.status(400).json({
                    message: `field ${rule.field} failed validation.`,
                    status: "error",
                    data: {
                        validation: {
                            error: true,
                            field: rule.field,
                            field_value: data.missions,
                            condition: rule.condition,
                            condition_value: rule.condition_value
                        }
                    }

                })
            }
        };


        // 'GTE':::
        // FIELD VALUE SHOULD BE GREATER THAN OR EQUAL TO THE CONDITION VALUE
        if (rule.condition === 'gte') {
            if (data.missions >= rule.condition_value) {
                res.status(200).json({
                    message: `field ${rule.field} successfully validated.`,
                    status: "success",
                    data: {
                        validation: {
                            error: false,
                            field: rule.field,
                            field_value: data.missions,
                            condition: rule.condition,
                            condition_value: rule.condition_value
                        }
                    }

                })
            } else {
                res.status(400).json({
                    message: `field ${rule.field} failed validation.`,
                    status: "error",
                    data: {
                        validation: {
                            error: true,
                            field: rule.field,
                            field_value: data.missions,
                            condition: rule.condition,
                            condition_value: rule.condition_value
                        }
                    }

                })
            }

        };


    } catch (error) {
        res.status(400).json({
            status: "error",
            error

        })
    }
}