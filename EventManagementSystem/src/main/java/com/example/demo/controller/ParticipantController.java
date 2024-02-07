package com.example.demo.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.ParticipantDao;

import com.example.demo.entity.Participants;

import com.example.demo.exception.ParticipantNotFoundException;
import com.example.demo.service.ParticipantService;
import com.example.demo.service.ParticipantServiceImpl;
@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/participant")
public class ParticipantController {
	@Autowired
	ParticipantService service;
	@Autowired
	ParticipantDao dao;
	@Autowired
	ParticipantServiceImpl participantServiceImpl;
	
	
	
	@PostMapping("/signup")
	    public ResponseEntity<Map<String, String>> singup(@RequestBody Participants participant) {
	        System.out.println("Received a signup request for participant: " + participant.getUsername());

	         this.service.addParticipant(participant);

	        System.out.println("Participant registered: " + participant);
	        
	        
	        Map<String, String> response = new HashMap<String, String>();
	        response.put("status", "success");
	        response.put("message", "User registered!!");
	        return new ResponseEntity<Map<String, String>>(response, HttpStatus.CREATED);
	    }
	 
	 
	 @GetMapping("/searchnew/{username}")
	    public ResponseEntity<List<Participants>>getByUsername(@PathVariable String username) {
		 return new ResponseEntity<List<Participants>>(this.service.findByUsername(username), HttpStatus.OK);
	 }
 
	@GetMapping("/showparticipant")
	
	public ResponseEntity<List<Participants>> findAll(){
		
		List<Participants> participant=service.findAll();
		System.out.println("Received a Request to get all participants data:"+ participant);
		return new ResponseEntity<List<Participants>>(participant, HttpStatus.OK);
		}

	/*
  @PostMapping("/login")
  public ResponseEntity<?> loginUser(@RequestBody Participants participantData){
	  System.out.println("Received a login request for participant: " + participantData.getName());
	  Participants participant=service.getParticipantByUsername(participantData.getName());
	  if(participant.getPassword().equals(participantData.getPassword())) {
		  System.out.println("Participant login successful: " + participant);
		  Participants user=new Participants();
		user.setParticipantId(participant.getParticipantId());
		user.setName(participant.getName());
		user.setContactno(participant.getContactno());
		user.setUsername(participant.getUsername());
		user.setEmail(participant.getEmail());
		return ResponseEntity.ok(user);
	  }
	  else {
			System.out.println("Participant login failed for: " + participantData.getName());
			return (ResponseEntity<?>) ResponseEntity.internalServerError();
  }
  }
  */
	
	@PostMapping("/login")
	  public ResponseEntity<?> loginUser( @RequestBody Participants participantData){
		
		  System.out.println("Received a login request for participant: " + dao.findByUsername(participantData.getUsername()));
		  
		  Participants participant=service.getParticipantByUsername(participantData.getUsername());
		  
		  
		  
		  if(participant.getPassword().equals(participantData.getPassword())) {
			  System.out.println("Participant login successful: " + participant);
			  Participants user=new Participants();
			user.setParticipantId(participant.getParticipantId());
			user.setName(participant.getName());
			user.setContactno(participant.getContactno());		user.setUsername(participant.getUsername());
			user.setEmail(participant.getEmail());
			return ResponseEntity.ok(user);
		  }
		  else {
				System.out.println("Participant login failed for: " + participantData.getName());
				return (ResponseEntity<?>) ResponseEntity.internalServerError();
	  }
	  }
  
  @PutMapping("/update") 
  public ResponseEntity<Map<String, String>> update(@RequestBody Participants e) {
	  System.out.println("Receive a request to update Participant Data:" + e);
	  try {
		  if( this.dao.findById(e.getParticipantId()).isPresent()) {
			  Participants participant=this.dao.findById(e.getParticipantId()).get();
			  participant.setName(e.getName());
			  participant.setContactno(e.getContactno());
			  participant.setUsername(e.getUsername());
			 
			  participant.setEmail(e.getEmail());
			  participant.setPassword(e.getPassword());
			  this.dao.save(participant);
			  
			  Map<String, String> response = new HashMap<String, String>();
              response.put("status", "success");
              response.put("message", "User data updated!!");
              System.out.println("participant data updated successfully: " + participant);
              return new ResponseEntity<Map<String, String>>(response, HttpStatus.CREATED);
          } else {
              Map<String, String> response = new HashMap<String, String>();
              response.put("status", "failed");
              response.put("message", "User data not found!!");
              System.out.println("Customer data not found for updating: " + e.getParticipantId());
              return new ResponseEntity<Map<String, String>>(response, HttpStatus.NOT_FOUND);
          }
      } catch (Exception e1) {
          Map<String, String> response = new HashMap<String, String>();
          response.put("status", "failed");
          response.put("message", "User data not updated!!");
          System.out.println("Failed to update customer data: " + e1.getMessage());
          return new ResponseEntity<Map<String, String>>(response, HttpStatus.BAD_REQUEST);
      }
  }
  @DeleteMapping("/delete/{id}")
  public ResponseEntity<Map<String,String>> updateUser(@PathVariable(name="id") long id){
	  System.out.println("Received a request to delete participant data by ID: " + id);
	  try {
		  this.service.deleteById(id);
		  System.out.println("Participant data deleted successfully for ID: " + id);
		  Map<String, String> response = new HashMap<String, String>();
          response.put("status", "success");
          response.put("message", "User data deleted!!");
          return new ResponseEntity<Map<String, String>>(response, HttpStatus.OK);
      } catch (Exception e) {
          System.out.println("Failed to delete participant data for ID: " + id);
          Map<String, String> response = new HashMap<String, String>();
          response.put("status", "failed");
          response.put("message", "Customer data not deleted!!");
          return new ResponseEntity<Map<String, String>>(response, HttpStatus.NOT_FOUND);
      }
  }
  @GetMapping("/id/{id}")
  public ResponseEntity<Participants> getParticipantById(@PathVariable long id) {
      System.out.println("Received a request to get participant by ID: " + id);

      Optional<Participants> customerOptional = dao.findById(id);
      if (customerOptional.isPresent()) {
          System.out.println("Returning customer for ID: " + id);
          return ResponseEntity.ok(customerOptional.get());
      } else {
          System.out.println("participant not found for ID: " + id);
          throw new ParticipantNotFoundException("Customer with Id " + id + " not found.");
      }
  }
}
