package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
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

import com.example.demo.dao.EventDao;
import com.example.demo.entity.Event;

import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.service.EventService;


@CrossOrigin(origins = "http://localhost:4200/")

@RestController
@RequestMapping("/Event")
public class EventController {
	@Autowired
	EventService service;
	@Autowired
	EventDao dao;
	@GetMapping("/showevents")
	public ResponseEntity<List<Event>> findAll(){
		 System.out.println("Received a request to get all menu items.");
		 List<Event> event=this.service.findall();
		 System.out.println("Returning all event items: " + event);
		 return new ResponseEntity<>(event, HttpStatus.OK);
		 
	}
	@GetMapping("/eventname/{name}")
	public ResponseEntity<List<Event>> findByName(@PathVariable String name){
		List<Event> event=service.findByName(name);
		if(event.isEmpty()) {
			System.out.println("No item name found for name :" + name);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		 System.out.println("Returning events  by name: " + event);
	        return new ResponseEntity<>(event, HttpStatus.OK);
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteEvent(@PathVariable int id) throws NotFoundException{
		System.out.println("Received a request to delete event item by ID: " + id);

		try {
			service.deleteById(id);
			System.out.println("Event is deleted successfully for : "+ id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		catch(EmptyResultDataAccessException ex) {
			 System.out.println("Event not found for deletion, ID: " + id);
	            throw new NotFoundException("Menu item with ID " + id + " not found.");
			
		}
		
	}
	@PutMapping("/update/{id}")
	public ResponseEntity<Map<String,String>> updateEvent(@RequestBody Event e){
		System.out.println("Received a request to update Event:"+e);
		try {
			if(this.dao.findById(e.getEvent_id()).isPresent()){
				Event existingevent=this.dao.findById(e.getEvent_id()).get();
				existingevent.setEvent_id(e.getEvent_id());
				existingevent.setModelEventName(e.getModelEventName());
				existingevent.setModelEventName(e.getImagepath());
				existingevent.setPrice(e.getPrice());
				
				Map<String,String> response=new HashMap<>();
				response.put("Status", "success");
				response.put("message", "Event updated");
				System.out.println("Event updated successfully:" + existingevent);
				return new ResponseEntity<>(response, HttpStatus.CREATED);
			}
			else {
				Map<String,String> response=new HashMap<>();
				response.put("status", "failed");
                response.put("message", "Menu item not found!!");
                System.out.println("Menu item not found for updating: " + e.getEvent_id());
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e1) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "failed");
            response.put("message", "Menu item not updated!!");
            System.out.println("Failed to update menu item: " + e1.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
	}
	@PostMapping("/addevent")
	public ResponseEntity<Event> addEvent(@RequestBody Event event) {
		System.out.println("Received a request to Add event" + event);
		try {

			Event eve =service.addEvent(event);
			 System.out.println("Menu item added successfully: " + eve);
	            return new ResponseEntity<>(eve, HttpStatus.CREATED);
	      
		}catch(Exception ex) {
			System.out.println("Failed to add menu item: " + ex.getMessage());
            throw new BadRequestException("Invalid data for adding menu item.");
        }
	
		
	    }
	@GetMapping("/event/{event_id}")
	public ResponseEntity<Event> getBookingById(@PathVariable int event_id){
		System.out.println("Received a request to get menu item by ID: " + event_id);

        Optional<Event> menu = service.findByEventId(event_id);

        if (menu.isPresent()) {
            System.out.println("Returning menu item: " + menu.get());
            return new ResponseEntity<>(menu.get(), HttpStatus.OK);
        } else {
            System.out.println("Menu item not found for ID: " + event_id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
		
	}
		
		
	


