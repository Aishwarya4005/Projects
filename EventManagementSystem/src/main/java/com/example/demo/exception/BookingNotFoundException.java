package com.example.demo.exception;

public class BookingNotFoundException extends RuntimeException {
	public BookingNotFoundException(String name) {
		super(name);
	}

}
