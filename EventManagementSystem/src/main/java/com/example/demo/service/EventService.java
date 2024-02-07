package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Event;
import com.example.demo.entity.Participants;


public interface EventService {
	public List<Event> findall();
	public void deleteById(int id);
	public void updateById(Event event);
	public Event addEvent(Event event);
	List<Event> findByName(String name);
	public Optional<Event> findByEventId(int id);
}
