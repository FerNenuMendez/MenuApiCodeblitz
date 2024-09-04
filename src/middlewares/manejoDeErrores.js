export function manejoDeErrores(error, req, res, next) {
  res.status(400)
  res.json({ status: 'Bad Request', error: error.message, message: "Hubo un error en el servidor, intentelo mas tarde. Si el error persiste contacte al proveedor del servicio." }),
    res.status(401)
  res.json({ status: 'Unauthorized', error: error.message, message: "Usted no posee autorizacion para hacer realizar esta accion." }),
    res.status(404)
  res.json({ status: 'Not Found', error: error.message, message: "Servidor no encontrado." }),
    res.status(407)
  res.json({ status: 'Authentication Required', error: error.message, message: "Necesita autorizacion para realizar esta accion." }),
    res.status(408)
  res.json({ status: 'Request Timeout', error: error.message, message: "Hubo un error en el servidor, intentelo mas tarde. Si el error persiste contacte al proveedor del servicio." }),
    res.status(500)
  res.json({ status: 'Internal Server Error', error: error.message, message: "Hubo un error en el servidor, intentelo mas tarde. Si el error persiste contacte al proveedor del servicio." }),
    res.status(503)
  res.json({ status: 'Service Unavailable', error: error.message, message: "Hubo un error en el servidor, intentelo mas tarde. Si el error persiste contacte al proveedor del servicio." }),
    res.status(522)
  res.json({ status: 'Connection Timed Out', error: error.message, message: "Hubo un error en el servidor, intentelo mas tarde. Si el error persiste contacte al proveedor del servicio." })
}