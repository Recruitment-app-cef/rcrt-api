//importe de las funciones utilizadas para administrar la db
const db = require('../db/db_connection');
const bookingFilter = require('../utils/filterOptions');
const cycleFilter = require('../utils/cycleFilterOptions')
const stateFilter = require('../utils/stateFilterOptions')
const map = require('../utils/mapData')
const signatureFilter = require('../utils/signatureFilterOptions')
//función para obtener todas las solicitudes hechas en este nuevo ciclo
const getRequests = async (req, res) => {

    try {
        let requests = []

        const { booking, cycle, state,
            signature, firstOption, secondOption,
            idValidator } = req.query

        //validación para controlar que se quiere filtrar por tipo de 
        //contratación
        if (booking) {

            if (cycle) {

                if (state) {

                    switch (state) {

                        case "true": {

                            if (signature) {

                                if (firstOption && secondOption) {

                                    if (idValidator) {

                                        const sendData = await bookingFilter
                                            .filterByBookingCycleSignatureValidator(
                                                booking, cycle, signature, [firstOption, secondOption],
                                                idValidator
                                            )

                                        if (sendData) {
                                            return res.status(200).json({ "data": sendData })
                                        } else {
                                            return res.status(404).json({ message: 'solicitudes no encontradas' })
                                        }

                                    } else {

                                        const sendData = await bookingFilter
                                            .filterByBookingCycleStateSignature(
                                                booking, cycle, true, signature,
                                                [firstOption, secondOption]
                                            )

                                        if (sendData) {
                                            return res.status(200).json({ "data": sendData })
                                        } else {
                                            return res.status(404).json({ message: 'solicitudes no encontradas' })
                                        }

                                    }

                                } else if (secondOption) {

                                    if (idValidator) {

                                        const sendData = await bookingFilter
                                            .filterByBookingCycleSignatureValidator(
                                                booking, cycle, signature, [secondOption],
                                                idValidator
                                            )

                                        if (sendData) {
                                            return res.status(200).json({ "data": sendData })
                                        } else {
                                            return res.status(404).json({ message: 'solicitudes no encontradas' })
                                        }

                                    } else {

                                        const sendData = await bookingFilter
                                            .filterByBookingCycleStateSignature(
                                                booking, cycle, true, signature,
                                                [secondOption]
                                            )

                                        if (sendData) {
                                            return res.status(200).json({ "data": sendData })
                                        } else {
                                            return res.status(404).json({ message: 'solicitudes no encontradas' })
                                        }

                                    }

                                } else if (firstOption) {

                                    if (idValidator) {

                                        const sendData = await bookingFilter
                                            .filterByBookingCycleSignatureValidator(
                                                booking, cycle, signature, [firstOption],
                                                idValidator
                                            )

                                        if (sendData) {
                                            return res.status(200).json({ "data": sendData })
                                        } else {
                                            return res.status(404).json({ message: 'solicitudes no encontradas' })
                                        }

                                    } else {

                                        const sendData = await bookingFilter
                                            .filterByBookingCycleStateSignature(
                                                booking, cycle, true, signature,
                                                [firstOption]
                                            )

                                        if (sendData) {
                                            return res.status(200).json({ "data": sendData })
                                        } else {
                                            return res.status(404).json({ message: 'solicitudes no encontradas' })
                                        }

                                    }

                                }

                            } else if (idValidator) {

                                const sendData = await bookingFilter
                                    .filterByBookingCycleValidator(
                                        booking, cycle, idValidator
                                    )

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            } else {

                                const sendData = await bookingFilter
                                    .filterByBookingCycleState(booking, cycle, true)

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            }

                        }
                        case "false": {

                            if (signature) {

                                if (firstOption && secondOption) {

                                    const sendData = await bookingFilter
                                        .filterByBookingCycleStateSignature(
                                            booking, cycle, false, signature,
                                            [firstOption, secondOption]
                                        )

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                } else if (secondOption) {

                                    const sendData = await bookingFilter
                                        .filterByBookingCycleStateSignature(
                                            booking, cycle, false, signature,
                                            [secondOption]
                                        )

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                } else if (firstOption) {

                                    const sendData = await bookingFilter
                                        .filterByBookingCycleStateSignature(
                                            booking, cycle, false, signature,
                                            [firstOption]
                                        )

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                }

                            } else {

                                const sendData = await bookingFilter
                                    .filterByBookingCycleState(booking, cycle, false)

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            }

                        }

                    }

                } else if (signature) {

                    if (firstOption && secondOption) {

                        const sendData = await bookingFilter
                            .filterByBookingCycleSignature(booking, cycle,
                                signature, [firstOption, secondOption]
                            )

                        if (sendData) {
                            return res.status(200).json({ "data": sendData })
                        } else {
                            return res.status(404).json({ message: 'solicitudes no encontradas' })
                        }

                    } else if (secondOption) {

                        const sendData = await bookingFilter
                            .filterByBookingCycleSignature(booking, cycle,
                                signature, [secondOption]
                            )

                        if (sendData) {
                            return res.status(200).json({ "data": sendData })
                        } else {
                            return res.status(404).json({ message: 'solicitudes no encontradas' })
                        }

                    } else if (firstOption) {

                        const sendData = await bookingFilter
                            .filterByBookingCycleSignature(booking, cycle,
                                signature, [firstOption]
                            )

                        if (sendData) {
                            return res.status(200).json({ "data": sendData })
                        } else {
                            return res.status(404).json({ message: 'solicitudes no encontradas' })
                        }

                    }

                } else {

                    const sendData = await bookingFilter
                        .filterByBookingCycle(booking, cycle)

                    if (sendData) {
                        return res.status(200).json({ "data": sendData })
                    } else {
                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                    }

                }

            } else if (state) {

                switch (state) {

                    case "true": {

                        if (signature) {

                            if (firstOption && secondOption) {

                                if (idValidator) {

                                    const sendData = await bookingFilter
                                        .filterByBookingSignatureValidator(
                                            booking, signature, [firstOption, secondOption]
                                            , idValidator
                                        )

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                } else {

                                    const sendData = await bookingFilter
                                        .filterByBookingStateSignature(booking, true, signature,
                                            [firstOption, secondOption])

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                }

                            } else if (secondOption) {

                                if (idValidator) {

                                    const sendData = await bookingFilter
                                        .filterByBookingSignatureValidator(
                                            booking, signature, [secondOption]
                                            , idValidator
                                        )

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                } else {

                                    const sendData = await bookingFilter
                                        .filterByBookingStateSignature(booking, true, signature,
                                            [secondOption])

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                }


                            } else if (firstOption) {

                                if (idValidator) {

                                    const sendData = await bookingFilter
                                        .filterByBookingSignatureValidator(
                                            booking, signature, [firstOption]
                                            , idValidator
                                        )

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                } else {

                                    const sendData = await bookingFilter
                                        .filterByBookingStateSignature(booking, true, signature,
                                            [firstOption])

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                }


                            }

                        } else if (idValidator) {

                            const sendData = await bookingFilter.filterByBookingValidator(
                                booking, idValidator
                            )

                            if (sendData) {
                                return res.status(200).json({ "data": sendData })
                            } else {
                                return res.status(404).json({ message: 'solicitudes no encontradas' })
                            }

                        } else {

                            const sendData = await bookingFilter.filterByBookingState(
                                booking, true
                            )

                            if (sendData) {
                                return res.status(200).json({ "data": sendData })
                            } else {
                                return res.status(404).json({ message: 'solicitudes no encontradas' })
                            }

                        }

                    }

                    case "false": {

                        if (signature) {

                            if (firstOption && secondOption) {

                                const sendData = bookingFilter
                                    .filterByBookingStateSignature(
                                        booking, false, signature, [firstOption, secondOption]
                                    )

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            } else if (secondOption) {

                                const sendData = bookingFilter
                                    .filterByBookingStateSignature(
                                        booking, false, signature,
                                        [secondOption]
                                    )

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            } else if (firstOption) {

                                const sendData = bookingFilter
                                    .filterByBookingStateSignature(
                                        booking, false, signature,
                                        [firstOption]
                                    )

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            }

                        } else {

                            const sendData = await bookingFilter.filterByBookingState(
                                booking, false
                            )

                            if (sendData) {
                                return res.status(200).json({ "data": sendData })
                            } else {
                                return res.status(404).json({ message: 'solicitudes no encontradas' })
                            }

                        }

                    }
                }

            } else if (signature) {

                if (firstOption && secondOption) {

                    const sendData = await bookingFilter.filterByBookingSignature(
                        booking, signature,
                        [firstOption, secondOption])

                    if (sendData) {
                        return res.status(200).json({ "data": sendData })
                    } else {
                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                    }

                } else if (secondOption) {

                    const sendData = await bookingFilter.filterByBookingSignature(
                        booking, signature,
                        [secondOption])

                    if (sendData) {
                        return res.status(200).json({ "data": sendData })
                    } else {
                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                    }

                } else if (firstOption) {

                    const sendData = await bookingFilter.filterByBookingSignature(
                        booking, signature,
                        [firstOption])
                    if (sendData) {
                        return res.status(200).json({ "data": sendData })
                    } else {
                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                    }
                }
            } else {

                const sendData = await bookingFilter.filterByBooking(booking)

                if (sendData) {
                    return res.status(200).json({ "data": sendData })
                } else {
                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                }
            }


        } else if (cycle) {

            if (state) {

                switch (state) {

                    case "true": {

                        if (signature) {

                            if (firstOption && secondOption) {

                                if (idValidator) {

                                    const sendData = await cycleFilter
                                        .filterByCycleSignatureValidator(
                                            cycle, signature, [firstOption,
                                            secondOption], idValidator
                                        )

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                } else {

                                    const sendData = await cycleFilter
                                        .filterByCycleSignature(cycle, signature,
                                            [firstOption, secondOption]
                                        )

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                }

                            } else if (secondOption) {

                                if (idValidator) {

                                    const sendData = await cycleFilter
                                        .filterByCycleSignatureValidator(
                                            cycle, signature, [secondOption],
                                            idValidator
                                        )

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                } else {

                                    const sendData = await cycleFilter
                                        .filterByCycleSignature(cycle, signature,
                                            [secondOption]
                                        )

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                }

                            } else if (firstOption) {

                                if (idValidator) {

                                    const sendData = await cycleFilter
                                        .filterByCycleSignatureValidator(
                                            cycle, signature, [firstOption],
                                            idValidator
                                        )

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                } else {

                                    const sendData = await cycleFilter
                                        .filterByCycleSignature(cycle, signature,
                                            [firstOption]
                                        )

                                    if (sendData) {
                                        return res.status(200).json({ "data": sendData })
                                    } else {
                                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                                    }

                                }

                            }

                        } else if (idValidator) {

                            const sendData = await cycleFilter.filterByCycleValidator(cycle, idValidator)

                            if (sendData) {
                                return res.status(200).json({ "data": sendData })
                            } else {
                                return res.status(404).json({ message: 'solicitudes no encontradas' })
                            }

                        } else {

                            const sendData = await cycleFilter.filterByCycleState(cycle, true)

                            if (sendData) {
                                return res.status(200).json({ "data": sendData })
                            } else {
                                return res.status(404).json({ message: 'solicitudes no encontradas' })
                            }

                        }

                    }

                    case "false": {

                        if (signature) {

                            if (firstOption && secondOption) {

                                const sendData = await cycleFilter
                                    .filterByCycleStateSignature(cycle, false, signature,
                                        [firstOption, secondOption]
                                    )

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            } else if (secondOption) {

                                const sendData = await cycleFilter
                                    .filterByCycleStateSignature(cycle, false, signature,
                                        [secondOption]
                                    )

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            } else if (firstOption) {

                                const sendData = await cycleFilter
                                    .filterByCycleStateSignature(cycle, false, signature,
                                        [firstOption]
                                    )

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            }

                        } else {

                            const sendData = await cycleFilter.filterByCycleState(cycle, false)

                            if (sendData) {
                                return res.status(200).json({ "data": sendData })
                            } else {
                                return res.status(404).json({ message: 'solicitudes no encontradas' })
                            }

                        }

                    }
                }
            } else if (signature) {

                if (firstOption && secondOption) {

                    const sendData = await cycleFilter.filterByCycleSignature(cycle, signature,
                        [firstOption, secondOption])

                    if (sendData) {
                        return res.status(200).json({ "data": sendData })
                    } else {
                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                    }

                } else if (secondOption) {

                    const sendData = await cycleFilter.filterByCycleSignature(cycle, signature,
                        [secondOption])

                    if (sendData) {
                        return res.status(200).json({ "data": sendData })
                    } else {
                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                    }

                } else if (firstOption) {

                    const sendData = await cycleFilter.filterByCycleSignature(cycle, signature,
                        [firstOption])

                    if (sendData) {
                        return res.status(200).json({ "data": sendData })
                    } else {
                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                    }
                }
            } else {

                const sendData = await cycleFilter.filterByCycle(cycle)

                if (sendData) {
                    return res.status(200).json({ "data": sendData })
                } else {
                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                }

            }

        } else if (state) {

            switch (state) {

                case "true": {

                    if (signature) {

                        if (firstOption && secondOption) {

                            if (idValidator) {

                                const sendData = await stateFilter
                                    .filterBySignatureValidator(
                                        signature, [firstOption, secondOption],
                                        idValidator
                                    )

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            } else {

                                const sendData = await stateFilter.filterByStateSignature(true, signature,
                                    [firstOption, secondOption])

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            }

                        } else if (secondOption) {

                            if (idValidator) {

                                const sendData = await stateFilter
                                    .filterBySignatureValidator(
                                        signature, [secondOption],
                                        idValidator
                                    )

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            } else {

                                const sendData = await stateFilter.filterByStateSignature(true, signature,
                                    [secondOption])

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            }


                        } else if (firstOption) {

                            if (idValidator) {

                                const sendData = await stateFilter
                                    .filterBySignatureValidator(
                                        signature, [firstOption],
                                        idValidator
                                    )

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            } else {

                                const sendData = await stateFilter.filterByStateSignature(true, signature,
                                    [firstOption])

                                if (sendData) {
                                    return res.status(200).json({ "data": sendData })
                                } else {
                                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                                }

                            }

                        }
                    } else if (idValidator) {

                        const sendData = await stateFilter.filterByValidator(idValidator)

                        if (sendData) {
                            return res.status(200).json({ "data": sendData })
                        } else {
                            return res.status(404).json({ message: 'solicitudes no encontradas' })
                        }

                    } else {

                        const sendData = await stateFilter.filterByState(true)

                        if (sendData) {
                            return res.status(200).json({ "data": sendData })
                        } else {
                            return res.status(404).json({ message: 'solicitudes no encontradas' })
                        }

                    }

                }

                case "false": {

                    if (signature) {

                        if (firstOption && secondOption) {

                            const sendData = await stateFilter.filterByStateSignature(false, signature,
                                [firstOption, secondOption])

                            if (sendData) {
                                return res.status(200).json({ "data": sendData })
                            } else {
                                return res.status(404).json({ message: 'solicitudes no encontradas' })
                            }

                        } else if (secondOption) {

                            const sendData = await stateFilter.filterByStateSignature(false, signature,
                                [secondOption])

                            if (sendData) {
                                return res.status(200).json({ "data": sendData })
                            } else {
                                return res.status(404).json({ message: 'solicitudes no encontradas' })
                            }

                        } else if (firstOption) {

                            const sendData = await stateFilter.filterByStateSignature(false, signature,
                                [firstOption])

                            if (sendData) {
                                return res.status(200).json({ "data": sendData })
                            } else {
                                return res.status(404).json({ message: 'solicitudes no encontradas' })
                            }
                        }

                    } else {

                        const sendData = await stateFilter.filterByState(false)

                        if (sendData) {
                            return res.status(200).json({ "data": sendData })
                        } else {
                            return res.status(404).json({ message: 'solicitudes no encontradas' })
                        }

                    }

                }
            }

        } else if (signature) {

            if (firstOption && secondOption) {

                const sendData = await signatureFilter.filterBySignature(signature,
                    [firstOption, secondOption])

                if (sendData) {
                    return res.status(200).json({ "data": sendData })
                } else {
                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                }

            } else if (secondOption) {

                const sendData = await signatureFilter.filterBySignature(signature,
                    [secondOption])

                if (sendData) {
                    return res.status(200).json({ "data": sendData })
                } else {
                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                }

            } else if (firstOption) {

                const sendData = await signatureFilter.filterBySignature(signature,
                    [firstOption])
                if (sendData) {
                    return res.status(200).json({ "data": sendData })
                } else {
                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                }
            }

        } else {

            //obteniendo información principal
            requests = await db('rcrt_all_elements')
                .select('*')
                .limit(10)
                .orderBy('id', 'asc');

            //enviando información para anidar la data necesaria
            //de cada solicitud encontrada
            const sendData = await map.mappingRequests(requests)

            if (sendData) {
                return res.status(200).json({ "data": sendData })
            } else {
                return res.status(404).json({ message: 'solicitudes no encontradas' })
            }
        }

    } catch (error) {
        console.error('Error al obtener las solicitudes: ', error)
        return res.status(500).json({ message: 'Error al obtener las solicitudes' })
    }

}

module.exports = {
    getRequests,
}
