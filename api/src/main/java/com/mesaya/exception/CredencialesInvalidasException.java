package com.mesaya.exception;

/** Login fallido. El mensaje es el mismo si el correo no existe o la clave es incorrecta. */
public class CredencialesInvalidasException extends RuntimeException {
	public CredencialesInvalidasException() {
		super("Correo o contraseña incorrectos.");
	}
}
