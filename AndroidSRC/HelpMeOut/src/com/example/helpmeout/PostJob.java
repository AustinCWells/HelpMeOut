package com.example.helpmeout;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;

public class PostJob extends ActionBarActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_post_job);
		
		Spinner categoriesSpinner = (Spinner) findViewById(R.id.categorySpinner);
		ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.jobCategories, android.R.layout.simple_spinner_item);
		adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		categoriesSpinner.setAdapter(adapter); 
		
		Spinner paymentSpinner = (Spinner) findViewById(R.id.paymentAmountSpinner);
		ArrayAdapter<CharSequence> adapter2 = ArrayAdapter.createFromResource(this, R.array.payment_array, android.R.layout.simple_spinner_item);
		adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		paymentSpinner.setAdapter(adapter2); 
		
		Spinner negotiableSpinner = (Spinner) findViewById(R.id.negotiableSpinner);
		ArrayAdapter<CharSequence> adapter3 = ArrayAdapter.createFromResource(this, R.array.negotiable_array, android.R.layout.simple_spinner_item);
		adapter3.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		negotiableSpinner.setAdapter(adapter3); 
		Button mHomeJob;
		mHomeJob = (Button) findViewById(R.id.submitButton);
		mHomeJob.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				goHome();
				
			}
		});
	}
	
	private void goHome(){
		Intent intent = new Intent(this,HomePage.class);
		startActivity(intent); 
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {

		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.post_job, menu);
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
