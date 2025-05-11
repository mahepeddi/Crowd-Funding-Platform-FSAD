package com.klef.fsd.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.fsd.project.model.Donation;
import com.klef.fsd.project.repository.DonationRepository;

	@Service
	public class DonationServiceImpl implements DonationService
	{
		@Autowired
		private DonationRepository donationRepository;

		@Override
		public String addDonation(Donation donation) 
		{
		   donationRepository.save(donation);
		   return "Donation Added Successfully";
		}

		@Override
		public List<Donation> viewallDonations() 
		{
		    return donationRepository.findAll();
		}

		@Override
		public Donation viewDonationById(int did) 
		{
		   return donationRepository.findById(did).orElse(null);
		}

		@Override
		public List<Donation> viewDonationsByCategory(String category) 
		{
			return donationRepository.findByCategory(category);
		}
}