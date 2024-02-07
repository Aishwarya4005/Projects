package com.example.demo.exception;

public class UserAlreadyExistException extends RuntimeException {
	public UserAlreadyExistException(String name) {
		super(name);
	}
}
