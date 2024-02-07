package com.example.demo.exception;

public class ParticipantNotFoundException extends RuntimeException{
	public ParticipantNotFoundException(String name) {
		super(name);
		}
	

}
