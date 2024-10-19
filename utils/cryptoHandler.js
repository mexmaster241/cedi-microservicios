import crypto from 'crypto';
import fs from 'fs';

const sign = crypto.createSign('SHA256');

class CryptoHandler {
    constructor(ordenPagoWs) {
        this.cadenaOriginal = "||" +
                ordenPagoWs['institucionContraparte'] + "|" +
                ordenPagoWs['empresa'] + "|" +
                ordenPagoWs['fechaOperacion'] + "||" +
                ordenPagoWs['claveRastreo'] + "|" +
                ordenPagoWs['institucionOperante'] + "|" +
                (ordenPagoWs['monto']).toFixed(2) + "|" +
                ordenPagoWs['tipoPago'] + "|||";
        if (ordenPagoWs['nombreOrdenante']) {
            this.cadenaOriginal = this.cadenaOriginal + ordenPagoWs['nombreOrdenante'] + "|";
        }
        if (ordenPagoWs['cuentaOrdenante']) {
            this.cadenaOriginal = this.cadenaOriginal + ordenPagoWs['cuentaOrdenante'] + "|";
        }
        if (ordenPagoWs['rfcCurpOrdenante']) {
            this.cadenaOriginal = this.cadenaOriginal + ordenPagoWs['rfcCurpOrdenante'] + "|";
        }
        this.cadenaOriginal = this.cadenaOriginal + "|" +
                ordenPagoWs['tipoCuentaBeneficiario'] + "|" +
                ordenPagoWs['nombreBeneficiario'] + "|" +
                ordenPagoWs['cuentaBeneficiario'] + "|" +
                ordenPagoWs['rfcCurpBeneficiario'] + "||||||" +
                ordenPagoWs['conceptoPago'] + "||||||" +
                ordenPagoWs['referenciaNumerica'] + "||" +
                ordenPagoWs['topologia'] + "||||||";
    }

    getSign() {
        console.log(this.cadenaOriginal);
        
        const privateKeyPath = 'privatekey/llavePrivada.pem';
        const passphrase = ''; // Añade la contraseña si la llave privada está protegida con una

        try {
            const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
            sign.update(this.cadenaOriginal);
            return sign.sign({ key: privateKey, passphrase: passphrase }, 'base64');
        } catch (error) {
            console.error('Error al firmar la cadena original:', error);
            throw error;
        }
    }
}

export default CryptoHandler;
