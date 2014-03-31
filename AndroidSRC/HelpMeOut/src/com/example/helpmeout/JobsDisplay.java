package com.example.helpmeout;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ExpandableListView;

public class JobsDisplay extends ActionBarActivity {
	 ExpandableListAdapter listAdapter;
    ExpandableListView expListView;
    List<String> listDataHeader;
    HashMap<String, List<String>> listDataChild;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_jobs_display);
		Button mHomeButton;
		mHomeButton = (Button) findViewById(R.id.homeButton);
		mHomeButton.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				toHome();
				
			}
		});
		
		
		// get the listview
        expListView = (ExpandableListView) findViewById(R.id.lvExp);
 
        // preparing list data
        prepareListData();
 
        listAdapter = new ExpandableListAdapter(this, listDataHeader, listDataChild);
 
        // setting list adapter
        expListView.setAdapter(listAdapter);
	}
	
	private void toHome(){
		Intent intent = new Intent(this, HomePage.class);
		startActivity(intent); 
	}
	

	 /*
     * Preparing the list data
     */
    private void prepareListData() {
        listDataHeader = new ArrayList<String>();
        listDataChild = new HashMap<String, List<String>>();
 
        // Adding child data
        listDataHeader.add("Job One");
        listDataHeader.add("Job Two");
        listDataHeader.add("Job Three");
 
        // Adding child data
        List<String> job1 = new ArrayList<String>();
        job1.add("Description: Double Double from Burger House");
        job1.add("Deadline Time: 5:30");
        job1.add("Deadline Day: 3/4/14");
        job1.add("Profit: $5.00");
      
 
        List<String> job2 = new ArrayList<String>();
        job2.add("Description: Laundry for room 215 at 3:45pm");
        job2.add("Deadline Time: 7:45");
        job2.add("Deadline Day: 3/23/98");
        job2.add("Profit: $10.00");

 
        List<String> job3 = new ArrayList<String>();
        job3.add("Description: Tutoring help in GUI/Databases");
        job3.add("Deadline Time: 7:43");
        job3.add("Deadline Day: 13/23/23");
        job3.add("Profit: $3.00");
 
        listDataChild.put(listDataHeader.get(0), job1); // Header, Child data
        listDataChild.put(listDataHeader.get(1), job2);
        listDataChild.put(listDataHeader.get(2), job3);
    }
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {

		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.jobs_display, menu);
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
