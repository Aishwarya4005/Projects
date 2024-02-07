package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.EventDao;
import com.example.demo.entity.Event;
import com.example.demo.entity.Participants;
@Service
public class EventServiceImpl implements EventService{
	@Autowired
	EventDao dao;
	@Override
	public List<Event> findall() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public void deleteById(int id) {
		// TODO Auto-generated method stub
		dao.deleteById(id);
	}

	@Override
	public void updateById(Event event) {
		// TODO Auto-generated method stub
		this.dao.save(event);
	}

	@Override
	public Event addEvent(Event event) {
		event.setImagepath("assets/images/"+event.getImagepath());
		return dao.save(event);
	}

	@Override
	public List<Event> findByName(String name) {
		// TODO Auto-generated method stub
		return dao.findByModelEventNameIgnoreCase(name);
	}

	@Override
	public Optional<Event> findByEventId(int id) {
		// TODO Auto-generated method stub
		return this.dao.findById(id);
	}

	

}
