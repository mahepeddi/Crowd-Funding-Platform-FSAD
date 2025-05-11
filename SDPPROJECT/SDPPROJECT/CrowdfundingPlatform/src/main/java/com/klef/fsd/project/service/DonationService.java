package com.klef.fsd.project.service;

import java.util.List;

import com.klef.fsd.project.model.Donation;

public interface DonationService 
{
	public String addDonation(Donation donation);
	public List<Donation> viewallDonations();
	public Donation viewDonationById(int did);
	public List<Donation> viewDonationsByCategory(String category);
}