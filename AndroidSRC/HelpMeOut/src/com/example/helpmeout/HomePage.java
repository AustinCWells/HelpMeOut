package com.example.helpmeout;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;

public class HomePage extends ActionBarActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_home_page);
		Button mPostJob, mGetJob, mProfile, mMyJobs;
		mMyJobs = (Button) findViewById(R.id.myJobsButton);
		mGetJob = (Button) findViewById(R.id.getJobButton);
		mPostJob = (Button) findViewById(R.id.postJobButton);
		mProfile = (Button) findViewById(R.id.profileButton);
		mMyJobs.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				toMyJobs();
				
			}
		});
		mProfile.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				toProfile(); 
				
			}
		});
		mPostJob.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				toPostJob(); 
				
			}
		});
		mGetJob.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				toAvailableJobs();
				
			}
		});

	}
	
	private void toMyJobs(){
		Intent intent = new Intent(this, JobsDisplay.class);
		startActivity(intent);
	}
	
	private void toProfile(){
		Intent intent = new Intent(this, ProfilePage.class);
		startActivity(intent);
	}
	private void toAvailableJobs(){
		Intent intent = new Intent(this, JobsAvailable.class);
		startActivity(intent);
	}
	
	private void toPostJob(){
		Intent intent = new Intent(this, PostJob.class);
		startActivity(intent);
	}
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {

		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.home_page, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			return true;
		}
		return super.onOptionsItemSelected(item);
	}

	


}
