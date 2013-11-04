/*

	Gerard Such Sanmartín

    This file is part of KYSS package.

    KYSS is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    KYSS is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with KYSS. If not, see <http://www.gnu.org/licenses/>.

	http://www.gnu.org/licenses/gpl.html

	Project KYSS last version (2013-10)
	Project KYSS v0.9 (2013-06)
	Project KYSS v0.8 (2013-04)
	Project KYSS v0.7 (2013-01)
	Project KYSS v0.6 (2012-11)
	Project KYSS v0.4 (2012-01-22)
	Project KYSS v0.3 (2011-12-31)

*/

//...................................................

function brain() // 2013.05.02, this is necessary (window.brain does not work) to create the object. window.brain variable will be substituted by this object!
	{
	this.graphs_protein_objects_are_initialised = 0; // global variable to know if a group of vars have to be initialised/reseted or not
	this.graphs_peptide_objects_are_initialised = 0; // global variable to know if a group of vars have to be initialised/reseted or not
	this.calculations = 0; // global variable to know if the tables for graphs have been updated (after a change of nodes showed) or not.

	this.layers = new Object();
	this.layers_css = new Object(); // each entry has a style css rule, thought to have the same entries as this.layers (filled by another function - css parse)

	// some of the entries are not used, but for coherency I leave like that
	this.layers.panel1 = 'progress_drag';
	this.layers.panel2 = 'top_panel2';
	this.layers.panel3 = 'top_panel3';
	this.layers.panel4 = 'top_panel4';
	this.layers_css.panel2 = '.top_panel2';
	this.layers_css.panel3 = '.top_panel3';
	this.layers_css.panel4 = '.top_panel4';

	this.layers.drag = 'progress_drag';
	this.layers_css.drag = '#progress_drag';
	this.layers.progress_reading = 'progress_reading';
	this.layers_css.progress_reading = '#progress_reading';
	this.layers.progress_converting_csv = 'progress_converting_csv';
	this.layers_css.progress_converting_csv = '#progress_converting_csv';
	this.layers.progress_converting_xml = 'progress_converting_xml';
	this.layers_css.progress_converting_xml = '#progress_converting_xml';

	this.layers.container_pp = 'container_pp';
	this.layers_css.container_pp = '#container_pp';
	this.layers.panel_proteins = 'panel_proteins';
	this.layers_css.panel_proteins = '#panel_proteins';
	this.layers.buffer_proteins = 'buffer_proteins';
	this.layers_css.buffer_proteins = '#buffer_proteins';
	this.layers.unselected_proteins = 'unselected_proteins';
	this.layers_css.unselected_proteins = '#unselected_proteins';

	this.layers.to_add_control_panels = 'to_add_control_panels';
	this.layers_css.to_add_control_panels = '#to_add_control_panels';
	this.layers.panel_selecting_files_to_be_moved = 'panel_selecting_files_to_be_moved';
	this.layers_css.panel_selecting_files_to_be_moved = '#panel_selecting_files_to_be_moved';


	this.parse_css(); // substitute the entries of layers_css for real css style rules

	this.files_analised = 0; // counter to know when all files have been analysed
	this.files_analised_names = new Array(); // array of the names
	this.proteins_analysed = 0; // to know if proteins are analysed
	this.peptides_analysed = 0; // to know if peptides are analysed
	this.is_area_defined = 0; // to know if area is included in the data
	this.total_area = new Array() // to store total area
	this.total_area_percentages = new Array() // to store total area
	this.exponencial_conversion_done = 0; // to only do the conversion of one graph 1 time, and not everytime that the button is clicked
	this.orthogonality_conversion_done = 0; // to only do the maths one time
	this.overlap_conversion_done = 0; // to calculate the overlap between lists just once

	this.total_number_of_proteins = 0;
	this.total_number_of_peptides = 0;
	this.total_number_of_peptides_non_asigned = 0;
	this.total_number_of_peptides_with_zero_MC = 0;
	this.total_number_of_modified_peptides = 0;
	this.total_number_of_peptides_with_mods_without_CAM = 0;

	this.data = new Object();
	this.data.xml_code = new Array();
	this.data.xhtml_code = new Array();
	this.data.xsl = 'package/kyss.xsl';

	this.data.proteins = new Array();
	this.data.peptides = new Array();
	this.proteins = new Object(); // all proteins will be linked to this object, merging all files, proteins.acc_P0456
	this.array_of_proteins = new Array(); // to store the associative array as a numeric array
	this.special = new Object(); // for those peptides not linked to a protein
	this.special.nobody = new Object(); // for those peptides not linked to a protein
	this.special.nobody.peptides = new Object(); // for those peptides not linked to a protein

	this.total_number_of_analysis = new Array();
	this.total_number_of_files = new Array();
	this.total_number_of_proteins_marked = 0;
	this.total_number_of_proteins_marked_less_than = 0;

	window.events = new events(); // global object for events

	this.graphs = new Object(); // to store data regarding graphs

	this.num_rt = 2; // each retention time will be "grouped" in segments of 2 units
	this.num_mass = 100; // each mass value will be "grouped" in segments of 100 units
	this.checkbox_previous_1; // to store the previous checkbox, to prevent the "inverse" graph in case that the checkbox have been changed
	this.checkbox_previous_2;
	this.moving = 0; // variable to see if the mouse is clicking and moving the graph div
	this.skip_nodes = 4; // to skip nodes of
	// calculate_width
	// graphs
	// close
	// hit0
	}

brain.prototype.initiate_xslt = function() // load xslt docs for a faster use, 2013.01.20
	{
	brain.xslt = new Object();
	brain.xslt.xslhttp = new XMLHttpRequest();
	brain.xslt.xslhttp.open("GET",brain.data.xsl,false); // false indicate synchronous
	brain.xslt.xslhttp.send();
	brain.xslt.xsl_doc = this.xslt.xslhttp.responseXML;
	brain.xslt.xsltProcessor = new XSLTProcessor();
	brain.xslt.xsltProcessor.importStylesheet(brain.xslt.xsl_doc);
	brain.xslt.parser = new DOMParser();

	brain.xslt.limit_proteins_xslt = 10; // to store total area
	brain.xslt.time_for_xslt = 0;
	brain.xslt.total_time_for_xslt = 0;
	}

brain.prototype.close_xslt = function() // load xslt docs for a faster use, 2013.01.20
	{
	delete brain.xslt.xslhttp;
	delete brain.xslt.xsl_doc;
	delete brain.xslt.xsltProcessor;
	delete brain.xslt.parser;
	delete brain.xslt;
	}

brain.prototype.parse_css = function() // parsing CSS, no other way of doing it, 2012.11.17
	{
	// parse CSS file and store references, the last rule to be found will be the one to be stored!!
	// still in the brain function, so "brain" is still not existent
	var rules = document.styleSheets[0].cssRules;
	for (i=0; i<rules.length; i++)
		{
		for (var rule in this.layers_css)
			{
			if (rules[i].selectorText.toLowerCase() == this.layers_css[rule])
				{
				this.layers_css[rule] = rules[i].style; // overwrite the content
				}
			}
		}
	}

//...................................................

brain.prototype.transition_reading = function() // transition, 2012.10.12
	{
	document.getElementById(brain.layers.panel1).addEventListener('transitionend',brain.transition_reading_finished,false);

	window.setTimeout(function() // required to show the css changes
		{
		brain.layers_css.panel2.display = 'none';
		brain.layers_css.panel3.display = 'none';
		brain.layers_css.drag.display = 'none';
		brain.layers_css.progress_reading.display = 'block';
		brain.transition_reading_finished();
		},0);

	}

brain.prototype.transition_converting_csv = function() // transition, 2012.10.12
	{
	window.setTimeout(function()
		{
		brain.layers_css.progress_reading.display = 'none';
		brain.layers_css.progress_converting_csv.display = 'block';
		brain.transition_converting_csv_finished();
		},0);
	}

brain.prototype.transition_converting_xml = function() // transition, 2012.10.12
	{
	window.setTimeout(function()
		{
		brain.layers_css.progress_converting_csv.display = 'none';
		brain.layers_css.progress_converting_xml.display = 'block';
		brain.transition_converting_xml_finished();
		},0);
	}

//...................................................

brain.prototype.reading_files = function(files) // read files dropped and organise in a structure, 2012.12.09
	{
//	document.getElementById(listening).removeEventListener('transitionend',brain.transition_reading_finished,false);
	
	var waiting = files.length; // files that have to be read before to proceed (all files in total)
	// building proteins and peptides objects separatedly
	for (var i = 0, f; f = files[i]; i++)
		{
		var name = f.name.slice(-8);
		if (name == 'psms.txt')
			{
			brain.peptides_analysed = 1;
			brain.data.peptides.push(f);
			}
		if (name == 'oups.txt')
			{
			brain.files_analised++; // not counting the peptides, to be changed if the program wants to focus as well in peptides
			brain.proteins_analysed = 1;
			var file = new Object();
			file.protein = f;
			file.peptide = '';
			file.name = f.name.slice(0,-18);
			brain.files_analised_names.push(file.name);
			file.data_protein = '';
			file.data_peptide = '';
			brain.data.proteins.push(file);
			}
		}
	
	// put each peptide file with the pertinent protein object -> array of proteins each one with the peptides file associated
	// proteins[0].protein, proteins[0].peptide
	var data = new Array();
	for (var i in brain.data.proteins)
		{
		var name = brain.data.proteins[i].name+'_psms.txt';
		for (var j in brain.data.peptides)
			{
			if (brain.data.peptides[j].name == name)
				{
				brain.data.proteins[i].peptide = brain.data.peptides[j];
				}
			}
		}
	
	// for each file or pair of files, read the files and store in the same object (all files in this method)
	var i = 0;
	var j = 0;
	const BYTES_PER_CHUNK = 100000;
	var reader = new FileReader();

	var uploading_file = brain.data.proteins[i].protein; // first protein to be read
	var file_size = parseInt(uploading_file.size);
	var start = 0;
	var end = start + BYTES_PER_CHUNK;
	if (end > file_size) {end = file_size;}

	uploading(); // start the reading

	function uploading() // nested function, not a waste of resources since it will be executed only one time at the beginning of the app
		{
		if (start < file_size)
			{
//			console.log('start ('+start+'), end ('+end+'), file_size ('+file_size+')');
			var chunk = uploading_file.slice(start, end);
//			reader.readAsText(chunk);
			reader.readAsBinaryString(chunk);
			}
		}

	reader.onloadend = function(e)
		{
		if (e.target.readyState == 2) // the file is being uploaded in chunks, and the chunk has been successfully read
			{
			var new_file = 0;
			if (i < brain.data.proteins.length) // first it reads the protein file
				{
				document.getElementById('file_monitor').max = brain.data.proteins[i].protein.size;
				document.getElementById('file_monitor').value = end;
				brain.data.proteins[i].data_protein += e.target.result;
				if (end >= brain.data.proteins[i].protein.size) // file read at 100%
					{
					new_file = 1; // start a new file
					i += 1; // next protein will be literally the next protein
					}
				}
			else
				{
				document.getElementById('file_monitor').max = brain.data.proteins[j].peptide.size;
				document.getElementById('file_monitor').value = end;
				brain.data.proteins[j].data_peptide += e.target.result;
				if (end >= brain.data.proteins[j].peptide.size) // file read at 100%
					{
					new_file = 1; // start a new file
					i += 1; // still adding, now it is a counter for the files to read -> related to "waiting" (it is like saying i = i+j)
					j += 1;
					}
				}

			if (i < waiting && i < brain.data.proteins.length && new_file)
				{
				uploading_file = brain.data.proteins[i].protein; // read the next protein
				end = 0;
				}
			else if (i < waiting && i >= brain.data.proteins.length && new_file)
				{
				uploading_file = brain.data.proteins[j].peptide; // read the next peptide
				end = 0;
				}

			if (i >= waiting)
				{
				console.log('finish reading')
				brain.reading_files_finished(); // let's send the message that this is over
				}
			else // keep reading or chunks or new files
				{
				file_size = parseInt(uploading_file.size);
				start = end;
				end = start + BYTES_PER_CHUNK;
				if (end > file_size) {end = file_size;}
				uploading();
				}
			}
		};

	}

brain.prototype.converting_csv = function() // from csv build the objects, and from there the xml code, 2013.04.25
	{
	// "load" the list of proteins
	var star_list = new process_list_of_proteins();

	// fill the protein of "nobody", where all peptides without any protein accession are stored.
	brain.special.nobody = new Object();
	brain.special.nobody.accession ='unassigned';
	brain.special.nobody.description = 'unassigned peptides are grouped here';
	brain.special.nobody.AAs = '-';
	brain.special.nobody.MW = '-';
	brain.special.nobody.pI = '-';
	brain.special.nobody.files = new Array();
	brain.special.nobody.peptides = new Object();

	var peptides = new Object(); // create an object of all peptides, it has to be global for all files
	var peptides_scan = new Object(); // to monitor whether that peptides belongs to a scan number already there (redundant then)

	brain.is_area_defined = 0; // there is NOT area

	for (m in brain.data.proteins) // for each protein file (and the respective peptide file)
		{

		// build an array of unique files corresponding to analysis
		var found = 0;
		var array_length = brain.total_number_of_analysis.length;
		while (array_length--)
			{
			if (brain.total_number_of_analysis[array_length] == brain.data.proteins[m].name)
				{
				// but it never comes here. just to check that it is not entered twice, but is it necessary?
				found = 1;
				}
			}

		if (found == 0)
			{
			brain.total_number_of_analysis.push(brain.data.proteins[m].name);
			}

		// for that file, add an entry to the "nobody" protein. One time per file (not per protein in the file)
		var file_data = new Object();
		file_data.name = brain.data.proteins[m].name; // name of the file
		file_data.num_of_file = m; // num of the file
		file_data.coverage = '-';
		file_data.proteins_num = '-';
		file_data.peptides_num = '-';
		file_data.unique_peptides = '-';
		file_data.psm = '-';
		file_data.area = '-';
		file_data.score = '-';
		brain.special.nobody.files.push(file_data);

		// defining before spliting the file in lines - proteins
		var lines = new Array();

		lines = brain.data.proteins[m].data_protein.split("\n");
		lines.pop(); // erase the last line that is empty
		//lines.splice(5000,parseInt(lines.length-5000)); // protection to clog the browser

		var pieces = new Array();
		pieces = lines[0].split("\t"); // first line is of titles
		//pieces[pieces.length-1] = pieces[pieces.length-1].slice(0,-1); // there is an extra character (UNICODE 13) that I don't know how to replace / not needed with regex
		lines.shift(); // erase the first line of definitions (we already have the pieces)

		// just standard search, 1 engine only

		// Accession	
		// Description
		// Sum(Coverage)	
		// Sum(# Proteins)	
		// Sum(# Unique Peptides)	
		// Sum(# Peptides)	
		// Sum(# PSMs)	
		// Area	
		// # Peptides A(2,4,6)	
		// # PSM A(2,4,6)	
		// Coverage A(2,4,6)	
		// Score A(2,4,6) -> there is no sum score, so best score is to be chosen
		// # AAs	
		// MW [kDa]	
		// calc. pI
	
		// if there are not multiple searches (with the same engine)
		// Accession	
		// Description	
		// # Proteins	
		// # Unique Peptides	
		// Area	
		// # Peptides	
		// # PSMs	
		// Coverage	
		// Score	
		// # AAs	
		// MW [kDa]	
		// calc. pI

		var numeration = new Array();
		var numeration_score = new Array();

		for (i in pieces)
			{
			switch(true)
				{
				case /^\"?Accession\"?/.test(pieces[i]):
					numeration[0] = i;
					break;
				case /^\"?Description\"?/.test(pieces[i]):
					numeration[1] = i;
					break;
				case /^\"?Sum\(Coverage\)\"?/.test(pieces[i]):
					numeration[2] = i;
					break;
				case /^\"?Sum\(\# Proteins\)\"?/.test(pieces[i]):
				case /^\"?\# Proteins\"?/.test(pieces[i]):
					numeration[3] = i;
					break;
				case /^\"?Sum\(\# Unique Peptides\)\"?/.test(pieces[i]):
				case /^\"?\# Unique Peptides\"?/.test(pieces[i]):
					numeration[4] = i;
					break;
				case /^\"?Sum\(\# Peptides\)\"?/.test(pieces[i]):
					numeration[5] = i;
					break;
				case /^\"?Sum\(\# PSMs\)\"?/.test(pieces[i]):
					numeration[6] = i;
					break;
				case /^\"?Area\"?/.test(pieces[i]):
					numeration[7] = i;
					break;
				case /^\"?\# AAs\"?/.test(pieces[i]):
					numeration[8] = i;
					break;
				case /^\"?MW \[kDa\]\"?/.test(pieces[i]):
					numeration[9] = i;
					break;
				case /^\"?calc\. pI\"?/.test(pieces[i]):
					numeration[10] = i;
					break;
				case /^\"?\# Peptides\"?/.test(pieces[i]):
					numeration[11] = i;
					break;
				case /^\"?\# PSM\"?/.test(pieces[i]):
					numeration[12] = i;
					break;
				case /^\"?Coverage\"?/.test(pieces[i]):
					numeration[13] = i;
					break;
				case /^\"?Score\"?/.test(pieces[i]):
//					numeration[14] = i;
					numeration_score.push(i); // I will chose the higher later on
					break;
				}
			}

		// check if there are empty values that indicates that there are not nodes in the search
		if (numeration[2] == undefined)
			{
			numeration[2] = numeration[13];
			numeration[5] = numeration[11];
			numeration[6] = numeration[12];
			}

		proteins:for (i in lines) // each line is a protein entry
			{
			pieces = lines[i].split("\t");

			// remove all " if the file is from PD1.4
			if (/^\"/.test(pieces[0])) // if there is ", then it is PD1.4)
				{
				for	(PD=0; PD<pieces.length; PD++)
					{
					pieces[PD] = pieces[PD].replace(/^\"/,""); // ") // parenthesis for bad formatting
					pieces[PD] = pieces[PD].replace(/\"([^\"]*)$/,""); // ")
					}
				}

			if (pieces[numeration[7]] == '' || isNaN(pieces[numeration[7]]) || pieces[numeration[7]] == null)
				{ // to avoid an "undefined" in the web page!
				pieces[numeration[7]] = '';
				}
			else
				{
				brain.is_area_defined = 1; // there IS area
				}

			if (!brain.proteins['acc'+pieces[numeration[0]]]) // if the protein has not been defined before, fill the entry
				{
				brain.proteins['acc'+pieces[numeration[0]]] = new Object();
				brain.proteins['acc'+pieces[numeration[0]]].accession = pieces[numeration[0]];
				brain.proteins['acc'+pieces[numeration[0]]].description = pieces[numeration[1]];
				brain.proteins['acc'+pieces[numeration[0]]].AAs = pieces[numeration[8]];
				brain.proteins['acc'+pieces[numeration[0]]].MW = pieces[numeration[9]];
				brain.proteins['acc'+pieces[numeration[0]]].pI = pieces[numeration[10]];
				// with multiple files it will refer to the sum of everything
				brain.proteins['acc'+pieces[numeration[0]]].total_peptides = '';
				brain.proteins['acc'+pieces[numeration[0]]].modified_peptides = '';
				brain.proteins['acc'+pieces[numeration[0]]].modified_peptides_percentage = '';
				brain.proteins['acc'+pieces[numeration[0]]].num_of_modifications = '';
				brain.proteins['acc'+pieces[numeration[0]]].files = new Array();
				brain.proteins['acc'+pieces[numeration[0]]].peptides = new Object();

				// if selected to not to colour, do not do (1st part)
//				if (document.getElementById('dont_colour_proteins').checked == false)
				if (yes = 1) // temporal, this has to be changed
					{
					var h = star_list.accessions.length;
					while (h--)
						{
						if (star_list.accessions[h] === pieces[numeration[0]])
							{
							brain.proteins['acc'+pieces[numeration[0]]].remarked_reference = new Array();
							brain.proteins['acc'+pieces[numeration[0]]].remarked_pubmed = new Array();
							brain.proteins['acc'+pieces[numeration[0]]].remarked_concentration_real = new Array();
							for (var k=0;k<9;k+=3)
								{
								if (star_list.data[h][k] != '')
									{
									brain.proteins['acc'+pieces[numeration[0]]].remarked_reference.push(star_list.data[h][k]);
									brain.proteins['acc'+pieces[numeration[0]]].remarked_pubmed.push(star_list.data[h][k+1]);
									brain.proteins['acc'+pieces[numeration[0]]].remarked_concentration_real.push(star_list.data[h][k+2]);
									}
								}
							}
						}
					}
				}

			// add the data of this search, in this form in case I need to have the searches separated in the future
			var file_data = new Object();
			file_data.name = brain.data.proteins[m].name; // name of the file
			file_data.num_of_file = m; // num of the file
			file_data.coverage = pieces[numeration[13]];
			file_data.proteins_num = pieces[numeration[3]];
			file_data.peptides_num = pieces[numeration[5]];
			file_data.unique_peptides = pieces[numeration[4]];
			file_data.psm = pieces[numeration[6]];
			file_data.area = pieces[numeration[7]];

			numeration[14] = numeration_score[0];
			for	(scores=1; scores<numeration_score.length; scores++)
				{
				if (pieces[numeration_score[scores]] > pieces[numeration[14]])
					{
					numeration[14] = numeration_score[scores];
					}
				}

			file_data.score = pieces[numeration[14]];

			brain.proteins['acc'+pieces[numeration[0]]].files.push(file_data); // it will be the same file but different proteins
			// this push is not ideal, makes proteins that appear only in files[1] appear as file[0], so it is a mess! but better
			// to keep like this and check later which file it belongs ->-> re-thought again, this is the way to go, so keep like this

			// and here sum all areas for each file
			if (brain.is_area_defined) // 1 if there is area
				{
// IT WAS WRONG, but I am still in doubt, why did I write this??
//				var current_file = brain.proteins['acc'+pieces[numeration[0]]].files.length-1;
//				if (brain.total_area[current_file] == null) brain.total_area[current_file] = 0;
//				if (file_data.area != '')
//					{
//					brain.total_area[current_file] += parseFloat(file_data.area); // sum all areas of file 0
//					}

				if (brain.total_area[m] == null) brain.total_area[m] = 0;
				if (file_data.area != '')
					{
					brain.total_area[m] += parseFloat(file_data.area); // sum all areas of file 0
					}

				}
			}

		if (brain.data.proteins[m].data_peptide) // each protein has the peptide file already linked/stored (the entire file with all file-related peptides)
			{

			lines = brain.data.proteins[m].data_peptide.split("\n");
			lines.pop();
			//lines.splice(2000,parseInt(lines.length-2000)); // protection to clog the browser

			var pieces = new Array();
			pieces = lines[0].split("\t");
			//pieces[pieces.length-1] = pieces[pieces.length-1].slice(0,-1); // there is an extra character (UNICODE 13) that I don't know how to replace / not needed with regex
			lines.shift(); // erase the first line of definitions

			// 1 Confidence Level	
			// 2 Search ID	
			// 3 Processing Node No	
			// 4 Sequence	
			// 5 Unique Sequence ID	
			// 6 PSM Ambiguity	
			// 7 Protein Descriptions	
			// 8 # Proteins	
			// 9 # Protein Groups	
			// 10 Protein Group Accessions	
			// 11 Modifications	
			// 12 Activation Type	
			// 13 DeltaScore	
			// 14 DeltaCn	
			// 15 Rank	
			// 16 Search Engine Rank	
			// 17 Precursor Area	
			// 18 q-Value	
			// 19 PEP	
			// 20 Decoy Peptides Matched	
			// 21 Exp Value	
			// 22 Homology Threshold	
			// 23 Identity High	
			// 24 Identity Middle	
			// 25 IonScore	
			// 26 Peptides Matched	
			// 27 # Missed Cleavages	
			// 28 Isolation Interference [%]	
			// 29 Ion Inject Time [ms]	
			// 30 Intensity	
			// 31 Charge	
			// 32 m/z [Da]	
			// 33 MH+ [Da]	
			// 34 Delta Mass [Da]	
			// 35 Delta Mass [PPM]	
			// 36 RT [min]	
			// 37 First Scan	
			// 38 Last Scan	
			// 39 MS Order	
			// 40 Ions Matched	
			// 41 Matched Ions	
			// 42 Total Ions	
			// 43 Spectrum File	
			// 44 Annotation
			
			// to zero
			var numeration = new Array(); // reset the array

			for (i in pieces)
				{
				switch(true)
					{
					case /^\"?Confidence Level\"?/.test(pieces[i]):
						numeration[0] = i;
						break;
					case /^\"?Search ID\"?/.test(pieces[i]):
						numeration[1] = i;
						break;
					case /^\"?Processing Node No\"?/.test(pieces[i]):
						numeration[2] = i;
						break;
					case /^\"?Sequence\"?/.test(pieces[i]):
						numeration[3] = i;
						break;
					case /^\"?Unique Sequence ID\"?/.test(pieces[i]):
						numeration[4] = i;
						break;
					case /^\"?PSM Ambiguity\"?/.test(pieces[i]):
						numeration[5] = i;
						break;
					case /^\"?Protein Descriptions\"?/.test(pieces[i]):
						numeration[6] = i;
						break;
					case /^\"?\# Proteins\"?/.test(pieces[i]):
						numeration[7] = i;
						break;
					case /^\"?\# Protein Groups\"?/.test(pieces[i]):
						numeration[8] = i;
						break;
					case /^\"?Protein Group Accessions\"?/.test(pieces[i]):
						numeration[9] = i;
						break;
					case /^\"?Modifications\"?/.test(pieces[i]):
						numeration[10] = i;
						break;
					case /^\"?Activation Type\"?/.test(pieces[i]):
						numeration[11] = i;
						break;
					case /^\"?DeltaScore\"?/.test(pieces[i]):
						numeration[12] = i;
						break;
					case /^\"?DeltaCn\"?/.test(pieces[i]):
						numeration[13] = i;
						break;
					case /^\"?Rank\"?/.test(pieces[i]):
						numeration[14] = i;
						break;
					case /^\"?Search Engine Rank\"?/.test(pieces[i]):
						numeration[15] = i;
						break;
					case /^\"?Precursor Area\"?/.test(pieces[i]):
						numeration[16] = i;
						break;
					case /^\"?q-Value\"?/.test(pieces[i]):
						numeration[17] = i;
						break;
					case /^\"?PEP\"?/.test(pieces[i]):
						numeration[18] = i;
						break;
					case /^\"?Exp Value\"?/.test(pieces[i]):
						numeration[19] = i;
						break;
					case /^\"?Homology Threshold\"?/.test(pieces[i]):
						numeration[20] = i;
						break;
					case /^\"?Identity High\"?/.test(pieces[i]):
						numeration[21] = i;
						break;
					case /^\"?Identity Middle\"?/.test(pieces[i]):
						numeration[22] = i;
						break;
					case /^\"?IonScore\"?/.test(pieces[i]):
						numeration[23] = i;
						break;
					case /^\"?Decoy Peptides Matched\"?/.test(pieces[i]):
						numeration[24] = i;
						break;
					case /^\"?Peptides Matched\"?/.test(pieces[i]):
						numeration[25] = i;
						break;
//					case /^\"?XCorr\"?/.test(pieces[i]):
//						numeration[26] = i;
//						break;
//					case /^\"?Probability\"?/.test(pieces[i]):
//						numeration[27] = i;
//						break;
//					case /^\"?SpScore\"?/.test(pieces[i]):
//						numeration[28] = i;
//						break;
					case /^\"?\# Missed Cleavages\"?/.test(pieces[i]):
						numeration[29] = i;
						break;
					case /^\"?Isolation Interference \[\%\]\"?/.test(pieces[i]):
						numeration[30] = i;
						break;
					case /^\"?Ion Inject Time \[ms\]\"?/.test(pieces[i]):
						numeration[31] = i;
						break;
					case /^\"?Intensity\"?/.test(pieces[i]):
						numeration[32] = i;
						break;
					case /^\"?Charge\"?/.test(pieces[i]):
						numeration[33] = i;
						break;
					case /^\"?m\/z \[Da\]\"?/.test(pieces[i]):
						numeration[34] = i;
						break;
					case /^\"?MH\+ \[Da\]\"?/.test(pieces[i]):
						numeration[35] = i;
						break;
					case /^\"?Delta Mass \[Da\]\"?/.test(pieces[i]):
						numeration[36] = i;
						break;
					case /^\"?Delta Mass \[PPM\]\"?/.test(pieces[i]):
						numeration[37] = i;
						break;
					case /^\"?RT \[min\]\"?/.test(pieces[i]):
						numeration[38] = i;
						break;
					case /^\"?First Scan\"?/.test(pieces[i]):
						numeration[39] = i;
						break;
					case /^\"?Last Scan\"?/.test(pieces[i]):
						numeration[40] = i;
						break;
					case /^\"?MS Order\"?/.test(pieces[i]):
						numeration[41] = i;
						break;
					case /^\"?Ions Matched\"?/.test(pieces[i]):
						numeration[42] = i;
						break;
					case /^\"?Matched Ions\"?/.test(pieces[i]):
						numeration[43] = i;
						break;
					case /^\"?Total Ions\"?/.test(pieces[i]):
						numeration[44] = i;
						break;
					case /^\"?Spectrum File\"?/.test(pieces[i]):
						numeration[45] = i;
						break;
					case /^\"?Annotation\"?/.test(pieces[i]):
						numeration[46] = i;
						break;
//					case /^\"?Quan Info\"?/.test(pieces[i]):
//						numeration[50] = i;
//						break;
//					case /^\"?Quan Usage\"?/.test(pieces[i]):
//						numeration[51] = i;
//						break;
//					case /^\"?QuanResultID\"?/.test(pieces[i]):
//						numeration[52] = i;
//						break;
					}
				}

			// each line is a peptide
			// each line -> build the peptide, or complement the peptide already found with the new information
			// when all peptides are done, search again and hang each peptide to each protein
			// in this way, I will have only one object per peptide
			// the alternative, each time I find a peptide, I put it in all proteins that it appear
			// and when the peptide appears again, when I complement the peptide, since this is not a copy but objects references,
			//   when I complement the information it will already be linked to the protein
			// So this is the best way then, faster (one loop less) and totally equivalent

			peptides_loop:
			for (i in lines)
				{
				if (!lines[i]) break;
				pieces = lines[i].split("\t");

				// remove all " if the file is from PD1.4
				if (/^\"/.test(pieces[0])) // if there is ", then it is PD1.4)
					{
					for	(PD=0; PD<pieces.length; PD++)
						{
						pieces[PD] = pieces[PD].replace(/^\"/,""); // ") // parenthesis for bad formatting
						pieces[PD] = pieces[PD].replace(/\"([^\"]*)$/,""); // ")
						}
					}

				var abort = 0; // to define is a peptide is redundant and has to be skiped (reset variable)
				var unique_description = pieces[numeration[39]]+pieces[numeration[45]]+brain.data.proteins[m].name; // link the scan number with the file and analysis
				unique_description = unique_description.replace(/\s/g,''); // remove white spaces

				var reg_undef = new RegExp("undefined");
				if (reg_undef.test(pieces[numeration[16]])) // to avoid an "undefined" in the web page!
					{
					pieces[numeration[16]] = '';
					}

				if (!peptides[pieces[numeration[3]]]) // if the peptide has not been defined before, fill the entry
					{
					peptides[pieces[numeration[3]]] = new Object();
					peptides[pieces[numeration[3]]].sequence = pieces[numeration[3]];
					peptides[pieces[numeration[3]]].peptides = new Object(); // to attach peptides later on
					peptides[pieces[numeration[3]]].files = new Array();
					}

				// if only one entry per scan number, abort when that scan number is already defined
				if (events_data.not_redundancy && peptides_scan[unique_description]) // if that scan number is already defined
					{
					abort = 1;
					}
				if (peptides_scan[unique_description]) // if that scan number is already defined
					{
					console.log('scan repeated '+pieces[numeration[39]]+', '+pieces[numeration[6]])
					}

				if (!peptides_scan[unique_description]) // if that scan number is not yet defined
					{
					peptides_scan[unique_description] = 1;
					}

				// modifications, create an object where its properties will be all the existing modifications in this file
				var modifications = new Object();
				var modifications_array = new Array();
				modifications_array = pieces[numeration[10]].split(";");
				var array_length = modifications_array.length;
				while (array_length--)
					{
					var mod = /.*\((.*?)\).*/.exec(modifications_array[array_length]);
					if (mod != null)
						{
						if (!modifications[mod[1]])
							{
							modifications[mod[1]] = 1;
							}
						else
							{
							modifications[mod[1]] += 1;
							}
						}
					}

				// add the data of this search, in this form in case I need to have the searches separated in the future
				var file_data = new Object();
				file_data.confidence = pieces[numeration[0]];
				file_data.node = pieces[numeration[2]];
				file_data.psm_ambiguity = pieces[numeration[5]]; // psm = peptide spectrum matching
				file_data.prot_descriptions = pieces[numeration[6]];
				file_data.proteins_rel = pieces[numeration[7]];
				file_data.protein_groups = pieces[numeration[8]];
				file_data.accessions = pieces[numeration[9]];

				file_data.modifications = pieces[numeration[10]];
				if (pieces[numeration[10]].indexOf(';') < 0 && pieces[numeration[10]].length < 1)
					{
					file_data.num_of_modifications = 0;
					}
				else
					{
					file_data.num_of_modifications = pieces[numeration[10]].split(";").length;
					}
				file_data.mods = new Object();
				file_data.mods = modifications;

				file_data.activation = pieces[numeration[11]];
				file_data.delta_score = pieces[numeration[12]];
				file_data.delta_cn = pieces[numeration[13]];
				file_data.rank = pieces[numeration[14]];
				file_data.search_engine_rank = pieces[numeration[15]]; // original rank by Mascot
				file_data.area = pieces[numeration[16]];
				file_data.qvalue = pieces[numeration[17]]; // minimal FDR at which the peptide appears in the output list (0.01 = 1%)
				file_data.pepvalue = pieces[numeration[18]]; // posterior error probability, the local FDR for that particular psm
				file_data.expvalue = pieces[numeration[19]]; // expectation value, number of matches of score >= of that expected by chance
				file_data.homology_threshold = pieces[numeration[20]];
				file_data.identity_high = pieces[numeration[21]];
				file_data.identity_middle = pieces[numeration[22]];
				file_data.score = pieces[numeration[23]];
				file_data.decoy_peptides_matched = pieces[numeration[24]];
				file_data.peptides_matched = pieces[numeration[25]];
				file_data.missed = pieces[numeration[29]];
				file_data.isolation_interference = pieces[numeration[30]];
				file_data.ion_inject_time = pieces[numeration[31]];
				file_data.intensity = pieces[numeration[32]];
				file_data.charge = pieces[numeration[33]];
				file_data.exp_mass = pieces[numeration[34]];
				file_data.mono_mass = pieces[numeration[35]];
				file_data.delta_mass = pieces[numeration[36]];
				file_data.delta_mass_ppm = pieces[numeration[37]];
				file_data.retention_time = pieces[numeration[38]];
				file_data.scan = pieces[numeration[39]];
				file_data.ions_matched = pieces[numeration[42]];
				file_data.file_found = pieces[numeration[45]];
				file_data.file_analysis = brain.data.proteins[m].name; // the name of the analysis
				file_data.num_of_file = m; // the num of the analysis

				// build an array of unique files
				var found = 0;
				var array_length = brain.total_number_of_files.length;
				while (array_length--)
					{
					if (brain.total_number_of_files[array_length] == file_data.file_found)
						{
						found = 1;
						}
					}

				if (found == 0)
					{
					brain.total_number_of_files.push(file_data.file_found);
					}

				if (!abort) // if this peptide has a scan number already there, and the option non-reduncancy is enabled, discard it
					{
					peptides[pieces[numeration[3]]].files.push(file_data); // this will contain as many "files" as the number of times this peptide has been found
					if (pieces[numeration[9]] == '') // no proteins assigned to this peptide
						{
						brain.special.nobody.peptides[pieces[numeration[3]]] = peptides[pieces[numeration[3]]];
						continue peptides_loop; // discard peptides non linked to a protein
						}

					var accessions = pieces[numeration[9]].split(";"); // accessions of proteins that this peptide has been linked to

					// for each accession, go and pick up the protein and put the peptide there. If proteins are exported as grouped, it means that each protein will represent the best of the group
					// if a peptide is shared among other proteins, that's it
					for (j in accessions)
						{
	
						// if the protein is defined. It won't be defined if the accession has not been chosen as a protein group's top protein. Then it will be discarded
						// if the peptide is already attached, this is a reference not a copy of the object. I only attach if it is not there
						if (brain.proteins['acc'+accessions[j]] && !brain.proteins['acc'+accessions[j]].peptides[pieces[numeration[3]]]) 
							{
							brain.proteins['acc'+accessions[j]].peptides[pieces[numeration[3]]] = peptides[pieces[numeration[3]]]; // brain.accP0374.peptides.SEQUEASDFAE = object
							}
						}
					}
				}
			}

		}

	// protein and peptide objects are ready, fill the values corresponding to the modified peptides for each protein, and calculate areas
	for (var items in brain.proteins) // for each protein, with the peptides linked to it
		{
		if (brain.proteins.hasOwnProperty(items))
			{
			var num_of_peptides = Object.keys(brain.proteins[items].peptides).length;
			var num_of_modified_peptides = 0;
			var num_of_modifications = 0;

			for (var peptide in brain.proteins[items].peptides) // within the peptides for this protein
				{
				if (brain.proteins[items].peptides.hasOwnProperty(peptide))
					{
					// files contains entries of the same peptide at differents RT, or from different files, but the same sequence and then modifications
					if (brain.proteins[items].peptides[peptide].files[0].num_of_modifications > 0)
						{
						num_of_modified_peptides++;
						num_of_modifications += brain.proteins[items].peptides[peptide].files[0].num_of_modifications;

						if ('Carbamidomethyl' in brain.proteins[items].peptides[peptide].files[0].mods)
							{
							if (num_of_modifications > 1) // if there are other modifications
								{
								brain.total_number_of_peptides_with_mods_without_CAM++;
								}
							}
						}
					}
				}

			brain.proteins[items].total_peptides = num_of_peptides;
			brain.proteins[items].modified_peptides = num_of_modified_peptides;
			brain.proteins[items].num_of_modifications = num_of_modifications;
			brain.proteins[items].modified_peptides_percentage = parseInt(1000*num_of_modified_peptides/num_of_peptides)/10;
			if (num_of_peptides == 0) // e.g. no peptides submitted
				{
				brain.proteins[items].modified_peptides_percentage = '';
				}

			// calculate areas
			if (brain.is_area_defined) // 1 if there is area
				{
				for (var f=0;f<brain.proteins[items].files.length;f++)
					{
					if (typeof brain.proteins[items].files[f].area != 'undefined')
						{
						// calculate percentage
						var file_num = brain.proteins[items].files[f].num_of_file;
						brain.proteins[items].files[f].area_percentage = 1000*brain.proteins[items].files[f].area / brain.total_area[file_num];
						}
					}
				}
			}
		}

	// update protein nobody, convert the associative array into a numeric one, to make sure "nobody" is the last
	brain.total_number_of_peptides_non_asigned = Object.keys(brain.special.nobody.peptides).length;
	brain.special.nobody.files[0].peptides_num = Object.keys(brain.special.nobody.peptides).length;
	for (var items in brain.proteins)
		{
		brain.array_of_proteins.push(brain.proteins[items]);
		}
	brain.array_of_proteins.push(brain.special.nobody);


	// create pieces of xml chunk to avoid firefox crash

	var final = brain.array_of_proteins.length;
	var limit_a = 0;
	var limit_b = brain.xslt.limit_proteins_xslt;
	var limit_array = 0;
	var total_number_of_peptides = 0;
	while (limit_a < final)
		{
		brain.data.xml_code[limit_array] = '<?xml version="1.0" encoding="ISO-8859-1"?>'
		+'<proteins>'
		+'<number_of_protein_analysis>';

		for (var i=0;i<brain.total_number_of_analysis.length;i++)
			{
			brain.data.xml_code[limit_array] += '<file>'+brain.total_number_of_analysis[i]+'</file>';
			}
		brain.data.xml_code[limit_array] += '</number_of_protein_analysis>'
		+'<number_of_peptide_files>';

		for (var i=0;i<brain.total_number_of_files.length;i++)
			{
			brain.data.xml_code[limit_array] += '<file>'+brain.total_number_of_files[i]+'</file>';
			}
		brain.data.xml_code[limit_array] += '</number_of_peptide_files>';

		var prot_number = limit_a+1;
		if (limit_b > final) {limit_b = final;}
		for (var i=limit_a; i<limit_b; i++)
			{

			brain.data.xml_code[limit_array] += ''
			+'<protein hit="'+prot_number+'" name="'+i+'">'
			+'<accession>'
			+'	<accs db="uniprot">'+brain.array_of_proteins[i].accession+'</accs>'
			+'</accession>';

			if (brain.array_of_proteins[i].remarked_reference)
				{

				var minimum = 5;
				for (var cc=0;cc<brain.array_of_proteins[i].remarked_reference.length;cc++)
					{
					if (brain.array_of_proteins[i].remarked_concentration_real[cc] < 100)
						{
						minimum = 1;
						}
					else if (brain.array_of_proteins[i].remarked_concentration_real[cc] < 1000 && brain.array_of_proteins[i].remarked_concentration_real[cc] >= 100)
						{
						(minimum > 1) && (minimum = 2);
						}
					else if (brain.array_of_proteins[i].remarked_concentration_real[cc] < 5000 && brain.array_of_proteins[i].remarked_concentration_real[cc] >= 1000)
						{
						(minimum > 2) && (minimum = 3);
						}
					else if (brain.array_of_proteins[i].remarked_concentration_real[cc] >= 5000)
						{
						(minimum > 3) && (minimum = 4);
						}
					}

				brain.total_number_of_proteins_marked++;
				if (minimum == 1) brain.total_number_of_proteins_marked_less_than++;

				brain.data.xml_code[limit_array] += ''
			+'<remarked><minimum>'+minimum+'</minimum>';

				for (var cc=0;cc<brain.array_of_proteins[i].remarked_reference.length;cc++)
					{
					if (brain.array_of_proteins[i].remarked_reference[cc])
						{
				brain.data.xml_code[limit_array] += '<value><reference>'+brain.array_of_proteins[i].remarked_reference[cc]+'</reference>'
												+'<pubmed>'+brain.array_of_proteins[i].remarked_pubmed[cc]+'</pubmed>'
												+'<concentration>'+brain.array_of_proteins[i].remarked_concentration_real[cc]+'</concentration></value>';
						}
					}

//				brain.data.xml_code[limit_array] = brain.data.xml_code[limit_array].slice(0,-1);
				brain.data.xml_code[limit_array] += ''
			+'</remarked>';
				}

			brain.data.xml_code[limit_array] += ''
			+'<description>'+brain.array_of_proteins[i].description+'</description>'
			+'<aas>'+brain.array_of_proteins[i].AAs+'</aas>'
			+'<mw>'+brain.array_of_proteins[i].MW+'</mw>'
			+'<pi>'+brain.array_of_proteins[i].pI+'</pi>'
			+'<num_of_peptides>'+brain.array_of_proteins[i].total_peptides+'</num_of_peptides>'
			+'<num_of_modified_peptides>'+brain.array_of_proteins[i].modified_peptides+'</num_of_modified_peptides>'
			+'<num_of_modifications>'+brain.array_of_proteins[i].num_of_modifications+'</num_of_modifications>'
			+'<percentage_of_modified_peptides>'+brain.array_of_proteins[i].modified_peptides_percentage+'</percentage_of_modified_peptides>';

			if (typeof brain.array_of_proteins[i].modified_peptides != 'undefined')
				{
				brain.total_number_of_modified_peptides += brain.array_of_proteins[i].modified_peptides;
				}

			for (var x=0;x<brain.array_of_proteins[i].files.length;x++)
				{
				brain.data.xml_code[limit_array] += ''
				+'<file name="'+brain.array_of_proteins[i].files[x].name+'">'
				+'<coverage>'+brain.array_of_proteins[i].files[x].coverage+'</coverage>'
				+'<proteins_num>'+brain.array_of_proteins[i].files[x].proteins_num+'</proteins_num>'
				+'<peptides_num>'+brain.array_of_proteins[i].files[x].peptides_num+'</peptides_num>'
				+'<unique_peptides>'+brain.array_of_proteins[i].files[x].unique_peptides+'</unique_peptides>'
				+'<psm>'+brain.array_of_proteins[i].files[x].psm+'</psm>';

				if (brain.array_of_proteins[i].files[x].area)
					{
					// replace E for e to understand EXCEL edited files
					brain.array_of_proteins[i].files[x].area = brain.array_of_proteins[i].files[x].area.replace('E+0','e');
					brain.array_of_proteins[i].files[x].area = brain.array_of_proteins[i].files[x].area.replace('E+','e');

					brain.data.xml_code[limit_array] += ''
					+'<area>'+brain.array_of_proteins[i].files[x].area+'</area>'
					+'<area_percentage>'+brain.array_of_proteins[i].files[x].area_percentage+'</area_percentage>';
					}

				brain.data.xml_code[limit_array] += ''
				+'<score>'+brain.array_of_proteins[i].files[x].score+'</score>'
				+'</file>';
				}

			brain.data.xml_code[limit_array] += ''
			+'<peptides>';

			var h = 0;
			for (j in brain.array_of_proteins[i].peptides) // each entry is a peptide
				{

				// before I did it here, for optimisation. Too complex at the end, I need to simplify
//				brain.calculate_graph_peptide_tables(brain.array_of_proteins[i].peptides[j].files[0],brain.array_of_proteins[i].peptides[j]);

				brain.data.xml_code[limit_array] += ''
				+'<peptide hit="'+h+'">'
				+'<sequence>'+brain.array_of_proteins[i].peptides[j].sequence+'</sequence>';
				h++;
				total_number_of_peptides++;

				if (brain.array_of_proteins[i].peptides[j].files[0].missed == 0)
					{
					brain.total_number_of_peptides_with_zero_MC++;
					}

				for (var k=0;k<brain.array_of_proteins[i].peptides[j].files.length;k++)
					{
					brain.data.xml_code[limit_array] += ''
					+'<file number="'+k+'">'
					+'<confidence>'+brain.array_of_proteins[i].peptides[j].files[k].confidence+'</confidence>'
					+'<node>'+brain.array_of_proteins[i].peptides[j].files[k].node+'</node>'
					+'<psm_ambiguity>'+brain.array_of_proteins[i].peptides[j].files[k].psm_ambiguity+'</psm_ambiguity>'
					+'<prot_descriptions>'+brain.array_of_proteins[i].peptides[j].files[k].prot_descriptions+'</prot_descriptions>'
					+'<proteins_rel>'+brain.array_of_proteins[i].peptides[j].files[k].proteins_rel+'</proteins_rel>'
					+'<protein_groups>'+brain.array_of_proteins[i].peptides[j].files[k].protein_groups+'</protein_groups>'
					+'<accessions>'+brain.array_of_proteins[i].peptides[j].files[k].accessions+'</accessions>'
					+'<modifications>'+brain.array_of_proteins[i].peptides[j].files[k].modifications+'</modifications>'
					+'<num_of_modifications>'+brain.array_of_proteins[i].peptides[j].files[k].num_of_modifications+'</num_of_modifications>'
					+'<activation>'+brain.array_of_proteins[i].peptides[j].files[k].activation+'</activation>'
					+'<delta_score>'+brain.array_of_proteins[i].peptides[j].files[k].delta_score+'</delta_score>'
					+'<delta_cn>'+brain.array_of_proteins[i].peptides[j].files[k].delta_cn+'</delta_cn>'
					+'<rank>'+brain.array_of_proteins[i].peptides[j].files[k].rank+'</rank>'
					+'<search_engine_rank>'+brain.array_of_proteins[i].peptides[j].files[k].search_engine_rank+'</search_engine_rank>';

					if (brain.array_of_proteins[i].peptides[j].files[k].area)
						{
						// replace E for e to understand EXCEL edited files
 						brain.array_of_proteins[i].peptides[j].files[k].area = brain.array_of_proteins[i].peptides[j].files[k].area.replace('E+0','e');
 						brain.array_of_proteins[i].peptides[j].files[k].area = brain.array_of_proteins[i].peptides[j].files[k].area.replace('E+','e');

						brain.data.xml_code[limit_array] += ''
						+'<area>'+brain.array_of_proteins[i].peptides[j].files[k].area+'</area>';
						}

					brain.data.xml_code[limit_array] += ''
					+'<qvalue>'+brain.array_of_proteins[i].peptides[j].files[k].qvalue+'</qvalue>'
					+'<pepvalue>'+brain.array_of_proteins[i].peptides[j].files[k].pepvalue+'</pepvalue>'
					+'<expvalue>'+brain.array_of_proteins[i].peptides[j].files[k].expvalue+'</expvalue>'
					+'<homology_threshold>'+brain.array_of_proteins[i].peptides[j].files[k].homology_threshold+'</homology_threshold>'
					+'<identity_high>'+brain.array_of_proteins[i].peptides[j].files[k].identity_high+'</identity_high>'
					+'<identity_middle>'+brain.array_of_proteins[i].peptides[j].files[k].identity_middle+'</identity_middle>'
					+'<score>'+brain.array_of_proteins[i].peptides[j].files[k].score+'</score>'
					+'<decoy_peptides_matched>'+brain.array_of_proteins[i].peptides[j].files[k].decoy_peptides_matched+'</decoy_peptides_matched>'
					+'<peptides_matched>'+brain.array_of_proteins[i].peptides[j].files[k].peptides_matched+'</peptides_matched>'
					+'<missed>'+brain.array_of_proteins[i].peptides[j].files[k].missed+'</missed>'
					+'<isolation_interference>'+brain.array_of_proteins[i].peptides[j].files[k].isolation_interference+'</isolation_interference>'
					+'<ion_inject_time>'+brain.array_of_proteins[i].peptides[j].files[k].ion_inject_time+'</ion_inject_time>'
					+'<intensity>'+brain.array_of_proteins[i].peptides[j].files[k].intensity+'</intensity>'
					+'<charge>'+brain.array_of_proteins[i].peptides[j].files[k].charge+'</charge>'
					+'<exp_mass>'+brain.array_of_proteins[i].peptides[j].files[k].exp_mass+'</exp_mass>'
					+'<mono_mass>'+brain.array_of_proteins[i].peptides[j].files[k].mono_mass+'</mono_mass>'
					+'<delta_mass>'+brain.array_of_proteins[i].peptides[j].files[k].delta_mass+'</delta_mass>'
					+'<delta_mass_ppm>'+brain.array_of_proteins[i].peptides[j].files[k].delta_mass_ppm+'</delta_mass_ppm>'
					+'<retention_time>'+brain.array_of_proteins[i].peptides[j].files[k].retention_time+'</retention_time>'
					+'<first_scan>'+brain.array_of_proteins[i].peptides[j].files[k].scan+'</first_scan>'
					+'<ions_matched>'+brain.array_of_proteins[i].peptides[j].files[k].ions_matched+'</ions_matched>'
					+'<file_found>'+brain.array_of_proteins[i].peptides[j].files[k].file_found+'</file_found>'
					+'<file_analysis>'+brain.array_of_proteins[i].peptides[j].files[k].file_analysis+'</file_analysis>'
					+'</file>';
					}

				brain.data.xml_code[limit_array] += ''
				+'</peptide>';
				}

			brain.data.xml_code[limit_array] += ''
			+'</peptides>'
			+'</protein>';
			prot_number += 1;
			}

		brain.data.xml_code[limit_array] += ''
		+'</proteins>';

		limit_a += brain.xslt.limit_proteins_xslt;
		limit_b += brain.xslt.limit_proteins_xslt;
		limit_array++;
		}

	brain.total_number_of_proteins = prot_number-2; // discount the last added and the non-assigned
	brain.total_number_of_peptides = total_number_of_peptides;

	brain.converting_csv_finished();
	}

brain.prototype.converting_xml = function(k) // from xml to (xslt) xhtml, 2013.01.19
	{
	if (!k) {k = 0;}
	document.getElementById('xslt_conversion').textContent = 'transforming ... '+k+' of '+brain.data.xml_code.length;
	console.log('transforming ... '+k+' of '+brain.data.xml_code.length);
	var xml_doc = brain.xslt.parser.parseFromString(brain.data.xml_code[k],'text/xml');
	brain.xslt.xsltProcessor.setParameter(null, "extra", brain.xslt.limit_proteins_xslt*k);
	brain.xslt.xsltProcessor.setParameter(null, "first_time", k);
	brain.converting_xml_tough(k,xml_doc);
	}

brain.prototype.converting_xml_tough = function(k,xml_doc) // from xml to (xslt) xhtml, for callback properties, 2013.01.20
	{
	brain.data.xhtml_code[k] = brain.xslt.xsltProcessor.transformToFragment(xml_doc,document);

	// until the document is transformed, wait. WRONG, this is a synchronous process, so until the previous function is not finish, it doesn't move
	var _timer = setInterval(
		function()
			{
			brain.xslt.time_for_xslt += 10;
			if (brain.xslt.time_for_xslt > 10000) // more than 10s for this file
				{
				document.getElementById('xslt_error').textContent = 'error with ... '+k+' of '+brain.data.xml_code.length+', repeating';
				brain.xslt.time_for_xslt = 0; // initialise counter
				if (_timer) clearInterval(_timer);
				brain.xslt.xsltProcessor.reset();
				brain.converting_xml(k);
				}
			if (brain.xslt.total_time_for_xslt > 100000) // more than 100s for this file
				{
				alert('failed');
				throw new Error('Process terminated');
				}
			if (brain.data.xhtml_code[k] != 'undefined')
				{
				brain.xslt.time_for_xslt = 0; // initialise counter
				if (_timer) clearInterval(_timer);
				k++;
				if (k<brain.data.xml_code.length)
					{
					brain.converting_xml(k);
					}
				else
					{
					brain.xslt.xsltProcessor.reset();
					brain.close_xslt();
					brain.converting_xml_finished();
					}
				}
			}, 10);
	}

brain.prototype.single_graph = function(divided,graph_type,data1,data2,data3,data4,data5,categories) // 2013.10.11
	{
	var graph_data = new Array();
	var graph_serie = new Array();
	for (var i=0; i<data4.length; i++)
		{
		var data_4 = parseFloat(data4[i]);
		var data_x = parseInt(i);
		if (data3 != null)
			{
			var data_x = parseInt(data3[i]);
			}
		if (divided) {data_x = parseFloat(data_x/divided);}

		if (data5 != null)
			{
			graph_data.push({name:data5[i],x:data_x,y:parseFloat(data_4)});
			}
		else
			{
			if (data1 == null)
				{graph_data.push({x:data_x,y:parseFloat(data_4)});}
			else
				{graph_data.push({x:data_x,y:parseFloat(data_4),a:data1[i],b:data2[i]});}
			}
		}

	graph_serie = [{
				name:brain.graphs.name1[graph_type],
				color:brain.graphs.colours[0],
				data:graph_data
				}];

	document.getElementById('graphs').style.display = 'block';

	if (!brain.graphs.min_x[graph_type]) {brain.graphs.min_x[graph_type] = null;}
	if (!brain.graphs.max_x[graph_type]) {brain.graphs.max_x[graph_type] = null;}
	if (!brain.graphs.min_y[graph_type]) {brain.graphs.min_y[graph_type] = null;}
	if (!brain.graphs.max_y[graph_type]) {brain.graphs.max_y[graph_type] = null;}
	if (!brain.graphs.style_x[graph_type]) {brain.graphs.style_x[graph_type] = 'block';}
	if (!brain.graphs.symbol[graph_type]) {brain.graphs.symbol[graph_type] = 'circle';}

	brain.draw_chart(
					brain.graphs.type[graph_type],
					graph_serie,
					'graphs',
					brain.graphs.min_x[graph_type],
					brain.graphs.max_x[graph_type],
					brain.graphs.min_y[graph_type],
					brain.graphs.max_y[graph_type],
					false,
					brain.graphs.tick_x[graph_type],
					brain.graphs.tick_y[graph_type],
					brain.graphs.radius[graph_type],
					brain.graphs.name1[graph_type],
					brain.graphs.funct[graph_type],
					brain.graphs.title_x[graph_type],
					brain.graphs.title_y[graph_type],
					categories,
					brain.graphs.style_x[graph_type],
					brain.graphs.symbol[graph_type]
					);
	}

brain.prototype.multiple_graph = function(divided,graph_type,data1,data2,data3) // 2013.04.30
	{
	var graph_data = new Array();
	var graph_serie = new Array();

	if (data1)
		{
		for (var i=0; i<data1.length; i++)
			{
			if (!isNaN(data1[i]))
				{
				var data_x = parseInt(i);
				if (divided) {data_x = data_x/divided;}
				graph_data.push([data_x,parseFloat(data1[i])]);
				}
			}
		graph_serie.push({
				name:brain.graphs.name11[graph_type],
				color:brain.graphs.colours[10],
				data:graph_data
				});
		}

	if (Array.isArray(data2[0])) // is an array of arrays
		{
		for (var j=0; j<data2.length; j++)
			{
			graph_data = new Array();
			for (var i=0; i<data2[j].length; i++)
				{
				if (!isNaN(data2[j][i]))
					{
					var data_x = parseInt(i);
					if (divided) {data_x = data_x/divided;}
					graph_data.push([data_x,parseFloat(data2[j][i])]);
					}
				}
			graph_serie.push({
					name:brain.graphs.name12[graph_type]+j+brain.graphs.name13[graph_type],
					color:brain.graphs.colours[j],
					data:graph_data
					});
			}
		}
	else if (!Array.isArray(data2)) // is an object and not an array
		{
			{
			var j = 0;
			for (var key in data2)
				{
				if (data2.hasOwnProperty(key))
					{
					graph_data = new Array();
					for (var i=0; i<data2[key].length; i++)
						{
						if (!isNaN(data2[key][i]))
							{
							var data_x = parseInt(i);
							if (divided) {data_x = data_x/divided;}
							graph_data.push([data_x,parseFloat(data2[key][i])]);
							}
						}
					graph_serie.push({
							name:brain.graphs.name12[graph_type]+key+brain.graphs.name13[graph_type],
							color:brain.graphs.colours[j],
							data:graph_data
							});
					j++;
					}
				}
			}
		}
	else if (Array.isArray(data2)) // is a simple array of strings
		{
		graph_data = new Array();
		for (var i=0; i<data2.length; i++)
			{
			if (!isNaN(data2[i]))
				{
				var data_x = parseInt(i);
				if (divided) {data_x = data_x/divided;}
				graph_data.push([data_x,parseFloat(data2[i])]);
				}
			}
		graph_serie.push({
				name:brain.graphs.name12[graph_type],
				color:brain.graphs.colours[0],
				data:graph_data
				});

		if (data3)
			{
			graph_data = new Array();
			for (var i=0; i<data3.length; i++)
				{
				if (!isNaN(data3[i]))
					{
					var data_x = parseInt(i);
					if (divided) {data_x = data_x/divided;}
					graph_data.push([data_x,parseFloat(data3[i])]);
					}
				}

			graph_serie.push({
						name:brain.graphs.name13[graph_type],
						color:brain.graphs.colours[9],
						data:graph_data
						});
			}
		}

	document.getElementById('graphs').style.display = 'block';

	if (!brain.graphs.min_x[graph_type]) {brain.graphs.min_x[graph_type] = null;}
	if (!brain.graphs.max_x[graph_type]) {brain.graphs.max_x[graph_type] = null;}

	brain.draw_chart(
					brain.graphs.type[graph_type],
					graph_serie,
					'graphs',
					brain.graphs.min_x[graph_type],
					brain.graphs.max_x[graph_type],
					null,
					null,
					false,
					brain.graphs.tick_x[graph_type],
					brain.graphs.tick_y[graph_type],
					brain.graphs.radius[graph_type],
					brain.graphs.name1[graph_type],
					brain.graphs.funct[graph_type],
					brain.graphs.title_x[graph_type],
					brain.graphs.title_y[graph_type]
					);
	}

brain.prototype.pair_graph = function(graph_type,data1,checkbox,other) // 2013.05.25
	{
	var graph_data = new Array();
	var graph_serie = new Array();
	var categories = new Array();
	var graph_chosen = checkbox;
	var filter = 0.5;
	var pie_total = 0;
	var found = 0;

	// when it is inverted, next time is just not inverting anything, even if going from top-n to global, if it was inverted it will not be inverted
	// but if it was not inverted, it will not be inverted neither, which is important since otherwise the behaviour was confusing
	if (brain.graphs.last_graph == graph_type 
		&& brain.graphs.last_other == other // if we click the TOP-n graph, it is not meant to be inverted
		&& brain.checkbox_previous_1 == brain.chosen_file1_for_graphing // if the checkboxes haven't changed
		&& brain.checkbox_previous_2 == brain.chosen_file2_for_graphing
		&& brain.files_analised != 1 // if it is the same, and 2 files are compared, invert the graph
		&& checkbox != 'dynamic_pie_check_'
		&& checkbox != 'dynamic_ratios_check_')
		{
		var temp = brain.chosen_file1_for_graphing;
		brain.chosen_file1_for_graphing = brain.chosen_file2_for_graphing;
		brain.chosen_file2_for_graphing = temp;
		temp = brain.chosen_file1_for_graphing_name;
		brain.chosen_file1_for_graphing_name = brain.chosen_file2_for_graphing_name;
		brain.chosen_file2_for_graphing_name = temp;
		brain.graphs.last_graph = '';
		brain.graphs.last_other = '';
		}
	else
		{
		brain.graphs.last_graph = graph_type;
		brain.graphs.last_other = other;
		}

	brain.checkbox_previous_1 = brain.chosen_file1_for_graphing;
	brain.checkbox_previous_2 = brain.chosen_file2_for_graphing;

	// there are empty slots, due to proteins that do not have area / exist in all files
	for (var i=0; i<data1.length; i++)
		{
		if (typeof data1[i][brain.chosen_file1_for_graphing] == 'undefined' || isNaN(data1[i][brain.chosen_file1_for_graphing]))
			{
			data1[i][brain.chosen_file1_for_graphing] = 0;
			}
		if (typeof data1[i][brain.chosen_file2_for_graphing] == 'undefined' || isNaN(data1[i][brain.chosen_file1_for_graphing]))
			{
			data1[i][brain.chosen_file2_for_graphing] = 0;
			}
		}

	if (checkbox == 'dynamic_check_' || checkbox == 'dynamic_pie_check_' || checkbox == 'dynamic_ratios_check_')
		{
		data1.sort(function (a,b)
			{
			return (b[brain.chosen_file1_for_graphing]-a[brain.chosen_file1_for_graphing]); // a means data1[x] and b means data1[x+1]
			});

		var data_series1 = new Array();
		var data_series2 = new Array();

		var top_value = data1.length;
		if (checkbox == 'dynamic_pie_check_') top_value = brain.graphs.max_x[graph_type];

		for (var i=0; i<top_value; i++)
			{
			if (checkbox == 'dynamic_check_')
				{
				// a value lower than 1 means a negative value in log. Here is how different from 1 is the value, so 1 has to be added
				data_series1.push({name:data1[i][0],y:parseFloat(Math.log(1+data1[i][brain.chosen_file1_for_graphing])/Math.log(10))});
				data_series2.push({name:data1[i][0],y:parseFloat(-Math.log(1+data1[i][brain.chosen_file2_for_graphing])/Math.log(10))});
				}
			else if (checkbox == 'dynamic_pie_check_')
				{
				// values of 0 means proteins with 0 area (no area or very low?), have to be discarded
				if (Math.abs(data1[i][brain.chosen_file1_for_graphing]) > filter)
					{
					data_series1.push({name:data1[i][0].slice(0,40),y:parseFloat(data1[i][brain.chosen_file1_for_graphing])});
					}
				}
			else if (checkbox == 'dynamic_ratios_check_')
				{
				if (Math.abs(data1[i][brain.chosen_file1_for_graphing]) > filter)
					{
					data_series1.push({name:data1[i][0],y:parseFloat(Math.log(data1[i][brain.chosen_file1_for_graphing])/Math.log(2))});
					}
//				data_series2.push({name:data1[i][0],y:parseFloat(-Math.log(data1[i][brain.chosen_file2_for_graphing])/Math.log(2))});
//				data_series1.push({name:data1[i][0],y:parseFloat(data1[i][brain.chosen_file1_for_graphing])});
//				data_series2.push({name:data1[i][0],y:parseFloat(-data1[i][brain.chosen_file2_for_graphing])});
				}
			categories.push(i);
			}
		if (checkbox == 'dynamic_pie_check_')
			{
			for (var i=top_value; i<data1.length; i++)
				{
				pie_total += parseFloat(data1[i][brain.chosen_file1_for_graphing]);
				}
			data_series1.push({name:'others',y:parseFloat(pie_total)});
			}

		graph_serie.push({name:'FILE: '+brain.chosen_file1_for_graphing_name,color:brain.graphs.colours[brain.chosen_file1_for_graphing],data:data_series1});
		graph_serie.push({name:'FILE: '+brain.chosen_file2_for_graphing_name,color:brain.graphs.colours[brain.chosen_file2_for_graphing],data:data_series2});
		}
	else if (checkbox == 'comparison_check_' || checkbox == 'comparison_score_check_' || checkbox == 'comparison_peptides_check_')
		{
		// let's generate before the array to be able to sort it later. And proteins not present in the 2 files cannot be included!
		var data_series1 = new Array();
		for (var i=0; i<data1.length; i++)
			{
			if (data1[i][brain.chosen_file1_for_graphing] != '' && data1[i][brain.chosen_file2_for_graphing] != '')
				{
				if (checkbox == 'comparison_peptides_check_')
					{
					var value = (data1[i][brain.chosen_file2_for_graphing]-data1[i][brain.chosen_file1_for_graphing]);
					if (Math.abs(value) > filter)
						{
						data_series1.push({name:data1[i][0],y:parseInt(value)});
						}
					}
				else
					{
					// a ratio will be always different than 0, between 0 and 1, and between 1 and infinite. We are measuring how different from 1 is the ratio, not necessary to add 1
//					var value = (data1[i][brain.chosen_file2_for_graphing]-data1[i][brain.chosen_file1_for_graphing]);
					var value = (Math.log(data1[i][brain.chosen_file2_for_graphing]/data1[i][brain.chosen_file1_for_graphing])/Math.log(2));
					if (Math.abs(value) > filter)
						{
						data_series1.push({name:data1[i][0],y:parseFloat(value)});
						}
					}
				}
			}
		data_series1.sort(function (a,b)
			{
			return (b.y-a.y); // a means data1[x] and b means data1[x+1]
			});

		for (var i=0; i<data_series1.length; i++)
			{
			categories.push(i);
			}
		}

	if (checkbox == 'comparison_check_')
		{
		graph_serie.push({
			name:'differences (log2) in percentage of areas of file '+brain.chosen_file2_for_graphing_name+'\n with respect to '+brain.chosen_file1_for_graphing_name,
			color:brain.graphs.colours[0],
			data:data_series1});
		}
	else if (checkbox == 'comparison_score_check_')
		{
		graph_serie.push({
			name:'differences (log2) in scores of file '+brain.chosen_file2_for_graphing_name+'\n with respect to '+brain.chosen_file1_for_graphing_name,
			color:brain.graphs.colours[0],
			data:data_series1});
		}
	else if (checkbox == 'comparison_peptides_check_')
		{
		graph_serie.push({
			name:'differences (simple rest) in number of peptides of file '+brain.chosen_file2_for_graphing_name+'\n with respect to '+brain.chosen_file1_for_graphing_name,
			color:brain.graphs.colours[0],
			data:data_series1});
		}

	document.getElementById('graphs').style.display = 'block';

	if (!brain.graphs.min_x[graph_type]) {brain.graphs.min_x[graph_type] = null;}
	if (!brain.graphs.max_x[graph_type]) {brain.graphs.max_x[graph_type] = null;}

	brain.draw_chart(
					brain.graphs.type[graph_type],
					graph_serie,
					'graphs',
					brain.graphs.min_x[graph_type],
					brain.graphs.max_x[graph_type],
					null,
					null,
					false,
					brain.graphs.tick_x[graph_type],
					brain.graphs.tick_y[graph_type],
					brain.graphs.radius[graph_type],
					brain.graphs.name1[graph_type],
					brain.graphs.funct[graph_type],
					brain.graphs.title_x[graph_type],
					brain.graphs.title_y[graph_type],
					categories,
					null,
					null,
					false
					);
	}

brain.prototype.files_graph = function(graph_type,data1) // 2013.04.25
	{
	var graph_serie = new Array();
	var categories = new Array();
	var data_series = new Array();

	for (var j=1; j<=brain.files_analised; j++) // 1 because matrix[0] is the accession, [1] is the first file, and so on
		{
		categories.push(brain.files_analised_names[j-1]); // add the number of file in the x axis
		}

	for (var i=0; i<data1.length; i++)
		{
		data_series = new Array();
		// there are empty slots, due to proteins that do not have area / exist in all files
		for (var j=1; j<=brain.files_analised; j++) // 1 because matrix[0] is the accession, [1] is the first file, and so on
			{
			if (data1[i][1] != 0)
				{
				// if the protein has not been detected in the non-1 files, let's simulate a very small value
				if (data1[i][j] == 0 || data1[i][j] == 'undefined' || typeof data1[i][j] == 'undefined' || isNaN(data1[i][j]))
					{
//					data1[i][j] = 0.00001;
					data_series.push({name:data1[i][0],y:-20});
					}
				else
					{
					data_series.push({name:data1[i][0],y:parseFloat(Math.log(data1[i][j]/data1[i][1])/Math.log(2))});
					}
				}
			}
		graph_serie.push({name:'',data:data_series});
		}

	document.getElementById('graphs').style.display = 'block';

	if (!brain.graphs.min_x[graph_type]) {brain.graphs.min_x[graph_type] = null;}
	if (!brain.graphs.max_x[graph_type]) {brain.graphs.max_x[graph_type] = null;}
	if (!brain.graphs.min_y[graph_type]) {brain.graphs.min_y[graph_type] = null;}
	if (!brain.graphs.max_y[graph_type]) {brain.graphs.max_y[graph_type] = null;}
	if (!brain.graphs.style_x[graph_type]) {brain.graphs.style_x[graph_type] = 'block';}
	if (!brain.graphs.symbol[graph_type]) {brain.graphs.symbol[graph_type] = 'circle';}

	brain.draw_chart(
					brain.graphs.type[graph_type],
					graph_serie,
					'graphs',
					brain.graphs.min_x[graph_type],
					brain.graphs.max_x[graph_type],
					brain.graphs.min_y[graph_type],
					brain.graphs.max_y[graph_type],
					false,
					brain.graphs.tick_x[graph_type],
					brain.graphs.tick_y[graph_type],
					brain.graphs.radius[graph_type],
					brain.graphs.name1[graph_type],
					brain.graphs.funct[graph_type],
					brain.graphs.title_x[graph_type],
					brain.graphs.title_y[graph_type],
					categories,
					brain.graphs.style_x[graph_type],
					brain.graphs.symbol[graph_type],
					false
					);
	}

brain.prototype.draw_chart = function(type,data,div,min_x,max_x,min_y,max_y,nonexact,tick_x,tick_y,radius,title,func,text_x,text_y,categories,hide,symbol,grouping) // 2013.05.04
	{
	if (!hide) {hide = 'block';}
	if (!symbol) {symbol = 'circle';}
	if (typeof grouping == 'undefined') {grouping = true;}

	var	chart = new Highcharts.Chart({
					chart: {renderTo:div,defaultSeriesType:type,zoomType:'xy',backgroundColor:'transparent',width:'840',height:'640',},
					title: {text:title},
					subtitle: {text:''},
					xAxis: {title: {text:text_x,style: {fontSize:'8px'}},labels: {style:{fontSize:'8px',display:hide}},min:min_x,max:max_x,startOnTick:false,
							endOnTick:nonexact,showLastLabel:true,tickInterval:tick_x,categories:categories},
					yAxis: {title: {text:text_y,style: {fontSize:'8px'}},labels: {style:{fontSize:'8px'}},min:min_y,max:max_y,startOnTick:false,
							tickInterval:tick_y},
					tooltip: {formatter:func,style:{fontSize:'8px'},positioner: function(){return{x:80,y:50};}},
					legend: {enabled:false,layout:'vertical',align:'left',verticalAlign:'top',x:100,y:70,floating:true,backgroundColor:'#FFFFFF',borderWidth:1},
					credits: {enabled:false},
					exporting: {enabled:true},
					plotOptions: {
						series: {
							turboThreshold:100000
							},
						scatter: {
							marker: {symbol:symbol,radius:radius,enabled:true,states:{hover:{enabled:true,lineColor:'rgb(100,100,100)'}}},
							states: {hover:{marker: {enabled: false}}}
							},
						area: {
							marker: {radius:2,enabled:false,states:{hover:{enabled:true,lineColor:'rgb(100,100,100)'}}},
							states: {hover:{marker: {enabled: false}}},
							lineWidth:0
							},
						line: {
							marker: {radius:2,enabled:false,states:{hover:{enabled:true,lineColor:'rgb(100,100,100)'}}},
							states: {hover:{lineWidth:4,marker: {enabled: false}}},
							lineWidth:0.4
							},
						column: {
							borderColor:'#000',borderWidth:0.1,groupPadding:0.1,pointPadding:0,
							grouping:grouping
							}
						},
					series: data
					});

	document.getElementById(div).onmousedown = function(event) {events.start_drag(event,this);} // if not using "function(event)..." and using directly the function "events.start..", event appears as not defined!
	document.getElementById("close").style.display = 'block';
	}

brain.prototype.calculate_graph_protein_tables = function(value) // 2013.05.26
	{

	// create objects if not defined (better here for better future understanding)
	if (!brain.graphs_protein_objects_are_initialised)
		{
		brain.graphs.protein_table = new Object(); // it will store all variables
		brain.graphs.protein_table.accession_relative_areas = new Array();
		brain.graphs.protein_table.accession_absolute_areas = new Array();
		brain.graphs.protein_table.accession_scores = new Array();
		brain.graphs.protein_table.accession_peptides = new Array();
		brain.graphs.protein_table.MW_proteins = new Array();
		brain.graphs.protein_table.pI_proteins = new Array();
		brain.graphs.protein_table.MW_coverage = new Array();
		brain.graphs.protein_table.pI_coverage = new Array();
		brain.graphs.protein_table.MW_area = new Array();
		brain.graphs.protein_table.pI_area = new Array();
		brain.graphs.protein_table.MW_unique_peptides = new Array();
		brain.graphs.protein_table.pI_unique_peptides = new Array();
		brain.graphs.protein_table.MW_peptides = new Array();
		brain.graphs.protein_table.pI_peptides = new Array();
		brain.graphs.protein_table.score = new Array();
		brain.graphs.protein_table.pI = new Array();
		brain.graphs.protein_table.MW = new Array();
		brain.graphs.protein_table.RT_proteins_with_1_unique_peptides = new Array();
		brain.graphs.protein_table.RT_proteins_with_2_unique_peptides = new Array();
		brain.graphs.protein_table.description = new Array();
		brain.graphs.protein_table.accession = new Array();

		brain.graphs_protein_objects_are_initialised = 1;
		}

	// in this function I have to translate the data from the files, which is just pushed to the object, to a matrix where actually position 0 means file 0, and
	// position 1 means file 1, and if there is no file 0, file 1 is still in position 1
	// This translation is required since the object is created push-like. Here I have to check the value of the file for each value. More robustness is obtained.

	var matrix = new Array();
	matrix[0] = value.accession+': '+value.description;
	for (var i=0; i<brain.files_analised; i++)
		{
		if (typeof value.files[i] != 'undefined')
			{
			matrix[parseInt(value.files[i].num_of_file)+1] = parseFloat(value.files[i].area_percentage);
			}
		}
	brain.graphs.protein_table.accession_relative_areas.push(matrix);

	var matrix = new Array();
	matrix[0] = value.accession+': '+value.description;
	for (var i=0; i<brain.files_analised; i++)
		{
		if (typeof value.files[i] != 'undefined')
			{
			matrix[parseInt(value.files[i].num_of_file)+1] = parseFloat(value.files[i].area);
			}
		}
	brain.graphs.protein_table.accession_absolute_areas.push(matrix);

	var matrix = new Array();
	matrix[0] = value.accession+': '+value.description;
	for (var i=0; i<brain.files_analised; i++)
		{
		if (typeof value.files[i] != 'undefined')
			{
			matrix[parseInt(value.files[i].num_of_file)+1] = parseFloat(value.files[i].score);
			}
		}
	brain.graphs.protein_table.accession_scores.push(matrix); // complex score matrix, to do the comparison. Just for this graph

	var matrix = new Array();
	matrix[0] = value.accession+': '+value.description;
	for (var i=0; i<brain.files_analised; i++)
		{
		if (typeof value.files[i] != 'undefined')
			{
			matrix[parseInt(value.files[i].num_of_file)+1] = parseFloat(value.files[i].peptides_num);
			}
		}
	brain.graphs.protein_table.accession_peptides.push(matrix); // complex peptide matrix, to do the comparison. Just for this graph

	brain.graphs.protein_table.accession.push(value.accession);
	brain.graphs.protein_table.description.push(value.description);
	brain.graphs.protein_table.score.push(parseFloat(value.files[0].score)); // I keep this "single" score since many graphs are based on this.
	brain.graphs.protein_table.pI.push(parseInt(value.pI*10));
	brain.graphs.protein_table.MW.push(parseInt(value.MW));


	// in this graphs, values added are just the first files, which can be from file_0, but also from file_1, etc. Therefore, these are useless for multiple files

	// MW vs number of proteins / coverage average / area / sum of unique peptides of proteins
	var num_mass = 5*parseInt(value.MW/5); // create an integer
	var num_mass1 = 10*parseInt(value.MW/10); // create an integer
	var num_pi = parseInt(value.pI*10); // create an integer
	var num_pi1 = 2*parseInt(value.pI*5); // create an integer

	brain.internal_counter(brain.graphs.protein_table.MW_proteins,num_mass);
	brain.internal_counter(brain.graphs.protein_table.MW_coverage,num_mass,undefined,value.files[0].coverage);
	brain.internal_counter(brain.graphs.protein_table.MW_unique_peptides,num_mass1,undefined,value.files[0].unique_peptides);
	brain.internal_counter(brain.graphs.protein_table.MW_peptides,num_mass1,undefined,value.files[0].peptides_num);

	// pI vs number of proteins / coverage average / area / 
	brain.internal_counter(brain.graphs.protein_table.pI_proteins,num_pi);
	brain.internal_counter(brain.graphs.protein_table.pI_coverage,num_pi,undefined,value.files[0].coverage);
	brain.internal_counter(brain.graphs.protein_table.pI_unique_peptides,num_pi1,undefined,value.files[0].unique_peptides);
	brain.internal_counter(brain.graphs.protein_table.pI_peptides,num_pi1,undefined,value.files[0].peptides_num);

	// including condition for area
	if (isNaN(value.files[0].area) || typeof(value.files[0].area) == 'undefined' || /^\s*$/.test(value.files[0].area))
		{} else // like this because I need that if ANY of the 3 options fails, it does not go on
		{
		brain.internal_counter(brain.graphs.protein_table.MW_area,num_mass,undefined,value.files[0].area);
		brain.internal_counter(brain.graphs.protein_table.pI_area,num_pi,undefined,value.files[0].area);
		}

	//------------------------------------------------------------
	// PROTEINS DEFINED BY UNIQUE PEPTIDES vs RT
	var RT_of_peptides_of_protein = new Array();

	// for each protein, see all peptides identified
	for (var key in value.peptides) // convert the object to an array
		{
		if (value.peptides.hasOwnProperty(key))
			{
			if (value.peptides[key].files[0].protein_groups < 2) // include only if this peptide is unique, i.e. only belongs to one protein
				{
				RT_of_peptides_of_protein.push(parseInt(value.peptides[key].files[0].retention_time)); // add the RT of all unique peptides of this protein
				}
			}
		}

	RT_of_peptides_of_protein.sort(function (a,b) {return (a-b);}); // sort peptides by RT, so we will count the earliest ones
	brain.internal_counter(brain.graphs.protein_table.RT_proteins_with_1_unique_peptides,RT_of_peptides_of_protein[0]);
	brain.internal_counter(brain.graphs.protein_table.RT_proteins_with_2_unique_peptides,RT_of_peptides_of_protein[1]);

	//------------------------------------------------------------

	}

brain.prototype.calculate_graph_peptide_tables = function(value,root) // 2013.05.19
	{
	var num_rt = brain.num_rt*parseInt(value.retention_time/brain.num_rt); // create an integer
	var num_mass = brain.num_mass*parseInt(value.exp_mass/brain.num_mass); // create an integer

	// What I am doing is to create arrays that accumulate the number of peptides in segments, e.g. segments of RT, of MASS, etc
	// In these cases, I will group these in a mother object, so that I can call the "graph" method and it will take care of everything
	// In other cases, where I have to make an array of peptides, I will also include it in the big object, to isolate the "graph" univers

	// create objects if not defined (better here for better future understanding)
	if (!brain.graphs_peptide_objects_are_initialised)
		{
		brain.graphs.peptide_table = new Object(); // it will store all variables
		brain.graphs.peptide_table.RT_unique_peptides = new Array();
		brain.graphs.peptide_table.MW_unique_peptides = new Array();
		brain.graphs.peptide_table.MW = new Array();
		brain.graphs.peptide_table.RT = new Array();
		brain.graphs.peptide_table.RT_peptides_for_files = new Array();
		brain.graphs.peptide_table.RT_peptides_for_files_name = new Array();
		brain.graphs.peptide_table.ion_inject_time = new Array();
		brain.graphs.peptide_table.score = new Array();
		brain.graphs.peptide_table.delta_mass = new Array();
		brain.graphs.peptide_table.ion_inject_time_mod = new Array();
		brain.graphs.peptide_table.score_mod = new Array();
		brain.graphs.peptide_table.delta_mass_mod = new Array();
		brain.graphs.peptide_table.num_of_modifications = new Array();
		brain.graphs.peptide_table.modifications_rt = new Object();
		brain.graphs.peptide_table.modifications_mw = new Object();
		brain.graphs.peptide_table.modifications_total_area_rt = new Object();
		brain.graphs.peptide_table.modifications_total_area_mw = new Object();

		brain.graphs.peptide_table.RT_total_peptides = new Array();
		brain.graphs.peptide_table.RT_total_peptides_mod = new Array();
		brain.graphs.peptide_table.RT_total_peptides_total_area = new Array();
		brain.graphs.peptide_table.RT_total_peptides_total_area_mod = new Array();
		brain.graphs.peptide_table.MW_total_peptides = new Array();
		brain.graphs.peptide_table.MW_total_peptides_mod = new Array();
		brain.graphs.peptide_table.MW_total_peptides_total_area = new Array();
		brain.graphs.peptide_table.MW_total_peptides_total_area_mod = new Array();

		brain.graphs.peptide_table.RT_missed_peptides = new Array();
		brain.graphs.peptide_table.RT_missed_peptides_mod = new Array();

		brain.graphs.peptide_table.RT_missed_peptides_total_area = new Array();
		brain.graphs.peptide_table.RT_missed_peptides_total_area_mod = new Array();

		brain.graphs.peptide_table.MW_missed_peptides = new Array();
		brain.graphs.peptide_table.MW_missed_peptides_mod = new Array();

		brain.graphs.peptide_table.MW_missed_peptides_total_area = new Array();
		brain.graphs.peptide_table.MW_missed_peptides_total_area_mod = new Array();

		brain.graphs.peptide_table.RT_charges = new Array();
		brain.graphs.peptide_table.RT_charges_mod = new Array();

		brain.graphs.peptide_table.MW_charges = new Array();
		brain.graphs.peptide_table.MW_charges_mod = new Array();

		brain.graphs.peptide_table.RT_charges_area = new Array();
		brain.graphs.peptide_table.RT_charges_area_mod = new Array();

		brain.graphs.peptide_table.MW_charges_area = new Array();
		brain.graphs.peptide_table.MW_charges_area_mod = new Array();

		brain.graphs.peptide_table.protein_descriptions = new Array();
		brain.graphs.peptide_table.accessions = new Array();

		for (var i=0; i<=10; i++)
			{
			brain.graphs.peptide_table.RT_missed_peptides[i] = new Array();
			brain.graphs.peptide_table.RT_missed_peptides_mod[i] = new Array();

			brain.graphs.peptide_table.RT_missed_peptides_total_area[i] = new Array();
			brain.graphs.peptide_table.RT_missed_peptides_total_area_mod[i] = new Array();

			brain.graphs.peptide_table.MW_missed_peptides[i] = new Array();
			brain.graphs.peptide_table.MW_missed_peptides_mod[i] = new Array();

			brain.graphs.peptide_table.MW_missed_peptides_total_area[i] = new Array();
			brain.graphs.peptide_table.MW_missed_peptides_total_area_mod[i] = new Array();

			brain.graphs.peptide_table.RT_charges[i] = new Array();
			brain.graphs.peptide_table.RT_charges_mod[i] = new Array();

			brain.graphs.peptide_table.MW_charges[i] = new Array();
			brain.graphs.peptide_table.MW_charges_mod[i] = new Array();

			brain.graphs.peptide_table.RT_charges_area[i] = new Array();
			brain.graphs.peptide_table.RT_charges_area_mod[i] = new Array();

			brain.graphs.peptide_table.MW_charges_area[i] = new Array();
			brain.graphs.peptide_table.MW_charges_area_mod[i] = new Array();
			}

		for (var i=0; i<=brain.files_analised; i++)
			{
			brain.graphs.peptide_table.RT_peptides_for_files[i] = new Array();
			}

		brain.graphs_peptide_objects_are_initialised = 1;
		}

	// populate matrix in number of peptides
	brain.internal_counter(brain.graphs.peptide_table.RT_total_peptides,num_rt);
	brain.internal_counter(brain.graphs.peptide_table.MW_total_peptides,num_mass);
	brain.internal_counter(brain.graphs.peptide_table.RT_missed_peptides,value.missed,num_rt);
	brain.internal_counter(brain.graphs.peptide_table.MW_missed_peptides,value.missed,num_mass);
	brain.internal_counter(brain.graphs.peptide_table.RT_charges,value.charge,num_rt);
	brain.internal_counter(brain.graphs.peptide_table.MW_charges,value.charge,num_mass);

	if (value.protein_groups == 1) // this peptide is unique
		{
		brain.internal_counter(brain.graphs.peptide_table.RT_unique_peptides,num_rt);
		brain.internal_counter(brain.graphs.peptide_table.MW_unique_peptides,num_mass);
		}

	if (value.num_of_modifications > 0) // this peptide has modifications
		{
		brain.internal_counter(brain.graphs.peptide_table.RT_total_peptides_mod,num_rt);
		brain.internal_counter(brain.graphs.peptide_table.MW_total_peptides_mod,num_mass);
		brain.internal_counter(brain.graphs.peptide_table.RT_missed_peptides_mod,value.missed,num_rt);
		brain.internal_counter(brain.graphs.peptide_table.MW_missed_peptides_mod,value.missed,num_mass);
		brain.internal_counter(brain.graphs.peptide_table.RT_charges_mod,value.charge,num_rt);
		brain.internal_counter(brain.graphs.peptide_table.MW_charges_mod,value.charge,num_mass);
		}

	// populate matrix in areas
	if (isNaN(value.area) || typeof(value.area) == 'undefined' || /^\s*$/.test(value.area))
		{} else // like this because I need that if ANY of the 3 options fails, it does not go on
		{
		brain.internal_counter(brain.graphs.peptide_table.RT_total_peptides_total_area,num_rt,undefined,value.area);
		brain.internal_counter(brain.graphs.peptide_table.MW_total_peptides_total_area,num_mass,undefined,value.area);
		brain.internal_counter(brain.graphs.peptide_table.RT_missed_peptides_total_area,value.missed,num_rt,value.area);
		brain.internal_counter(brain.graphs.peptide_table.MW_missed_peptides_total_area,value.missed,num_mass,value.area);
		brain.internal_counter(brain.graphs.peptide_table.RT_charges_area,value.charge,num_rt,value.area);
		brain.internal_counter(brain.graphs.peptide_table.MW_charges_area,value.charge,num_mass,value.area);

		if (value.num_of_modifications > 0) // this peptide has modifications
			{
			brain.internal_counter(brain.graphs.peptide_table.RT_total_peptides_total_area_mod,num_rt,undefined,value.area);
			brain.internal_counter(brain.graphs.peptide_table.MW_total_peptides_total_area_mod,num_mass,undefined,value.area);
			brain.internal_counter(brain.graphs.peptide_table.RT_missed_peptides_total_area_mod,value.missed,num_rt,value.area);
			brain.internal_counter(brain.graphs.peptide_table.MW_missed_peptides_total_area_mod,value.missed,num_mass,value.area);
			brain.internal_counter(brain.graphs.peptide_table.RT_charges_area_mod,value.charge,num_rt,value.area);
			brain.internal_counter(brain.graphs.peptide_table.MW_charges_area_mod,value.charge,num_mass,value.area);
			}
		}

	// populate matrix in types of modifications
	for (var key in value.mods) // initialise variables
		{
		if (value.mods.hasOwnProperty(key) && !isNaN(value.mods[key]) && typeof value.mods[key] != 'undefined')
			{
			if (!brain.graphs.peptide_table.modifications_rt[key])
				{
				brain.graphs.peptide_table.modifications_rt[key] = new Array();
				}
			if (!brain.graphs.peptide_table.modifications_mw[key])
				{
				brain.graphs.peptide_table.modifications_mw[key] = new Array();
				}
			if (!brain.graphs.peptide_table.modifications_total_area_rt[key])
				{
				brain.graphs.peptide_table.modifications_total_area_rt[key] = new Array();
				}
			if (!brain.graphs.peptide_table.modifications_total_area_mw[key])
				{
				brain.graphs.peptide_table.modifications_total_area_mw[key] = new Array();
				}

			// Within a loop, each modification will count 1, even if it has 3 oxidations, it will be 1 peptide modified with oxidation

			brain.internal_counter(brain.graphs.peptide_table.modifications_rt,key,num_rt);
			brain.internal_counter(brain.graphs.peptide_table.modifications_mw,key,num_mass);
//			brain.internal_counter(brain.graphs.peptide_table.modifications_rt,key,num_rt,value.mods[key]);
//			brain.internal_counter(brain.graphs.peptide_table.modifications_mw,key,num_mass,value.mods[key]);

			// area
			if (isNaN(value.area) || typeof(value.area) == 'undefined' || /^\s*$/.test(value.area))
				{} else // like this because I need that if ANY of the 3 options fails, it does not go on
				{
				// if this peptide has this modification, then add its area (if it has 1 or 3 equal mods, doesn't matter
				brain.internal_counter(brain.graphs.peptide_table.modifications_total_area_rt,key,num_rt,value.area);
				brain.internal_counter(brain.graphs.peptide_table.modifications_total_area_mw,key,num_mass,value.area);
				}
			}
		}
	//------------------------------------------------------------

	brain.graphs.peptide_table.num_of_modifications.push(value.num_of_modifications);
	brain.graphs.peptide_table.MW.push(value.exp_mass);
	brain.graphs.peptide_table.RT.push(value.retention_time);
	brain.graphs.peptide_table.score.push(value.score);
	brain.graphs.peptide_table.ion_inject_time.push(value.ion_inject_time);
	brain.graphs.peptide_table.delta_mass.push(value.delta_mass_ppm);
	brain.graphs.peptide_table.protein_descriptions.push(value.prot_descriptions);
	brain.graphs.peptide_table.accessions.push(value.accessions);

	if (value.num_of_modifications > 0) // this peptide has modifications
		{
		brain.graphs.peptide_table.score_mod.push(value.score);
		brain.graphs.peptide_table.ion_inject_time_mod.push(value.ion_inject_time);
		brain.graphs.peptide_table.delta_mass_mod.push(value.delta_mass_ppm);
		}
	else // add a blank value instead
		{
		brain.graphs.peptide_table.score_mod.push('');
		brain.graphs.peptide_table.ion_inject_time_mod.push('');
		brain.graphs.peptide_table.delta_mass_mod.push('');
		}

	// to BUILD the matrix of ORTHOGONALITY (graph)
	// for each peptide, add the value of RT to the array for each file
	// each peptide can be found several times in a file, I need to take only 1 value
	// for each value inserted for the peptide, I have to take only one per file

	var number_of_times = new Array;
	var sum_of_values = new Array;
	var somebody = new Array();
	for (var i=0; i<brain.files_analised; i++)
		{
		number_of_times[i] = 0;
		sum_of_values[i] = 0;
		somebody[i] = 0;
		}

	for (var i=0; i<root.files.length; i++)
		{
		if (typeof root.files[i] != 'undefined')
			{
			var retent = parseFloat(root.files[i].retention_time);
			number_of_times[root.files[i].num_of_file]++;
			sum_of_values[root.files[i].num_of_file] += retent;
			somebody[root.files[i].num_of_file] = 1;
			}
		}

	for (var i=0; i<brain.files_analised; i++)
		{
		if (somebody[i] != 0)
			{
			brain.graphs.peptide_table.RT_peptides_for_files[i].push(sum_of_values[i]/number_of_times[i]);
			}
		else
			{
			brain.graphs.peptide_table.RT_peptides_for_files[i].push(0);
			}
		}
	brain.graphs.peptide_table.RT_peptides_for_files_name.push(root.sequence);

	}

brain.prototype.internal_counter = function(array1,value1,num,area)
	{
	if (isNaN(area))
		{
		area = 1;
		}

	if (isNaN(num))
		{
		if (!isNaN(array1[value1]) || typeof array1[value1] != 'undefined')
			{
			array1[value1] += parseFloat(area);
			}
		else
			{
			array1[value1] = parseFloat(area);
			}
		}
	else
		{
		if (!isNaN(array1[value1][num]) || typeof array1[value1][num] != 'undefined')
			{
			array1[value1][num] += parseFloat(area);
			}
		else
			{
			array1[value1][num] = parseFloat(area);
			}
		}
	}

brain.prototype.internal_array_check = function(array1,num) // 2013.04.30
	{
	var is_a_simple_array;
	var is_an_array_of_arrays;
	var is_a_hash_of_arrays;

	if (Array.isArray(array1))
		{
		if (Array.isArray(array1[0]))
			{
			is_an_array_of_arrays = 1;
			}
		else
			{
			is_a_simple_array = 1;
			}
		}
	else
		{
		is_a_hash_of_arrays = 1;
		}

	if (is_an_array_of_arrays)
		{
		for (var i=0;i<array1.length;i++)
			{
			for (var j=0;j<array1[i].length;j=j+num)
				{
				if (typeof array1[i][j] == 'undefined')
					{
					array1[i][j] = 0;
					}
				}
			}
		}
	else if (is_a_hash_of_arrays)
		{
		for (var key in array1) // I need to initialise these arrays because I cannot initialise them before, they are associative (key)!
			{
			if (array1.hasOwnProperty(key))
				{
				for (var j=0;j<array1[key].length;j=j+num)
					{
					if (typeof array1[key][j] == 'undefined')
						{
						array1[key][j] = 0;
						}
					}
				}
			}
		}
	else if (is_a_simple_array)
		{
		for (var i=0;i<array1.length;i=i+num)
			{
			if (typeof array1[i] == 'undefined')
				{
				array1[i] = 0;
				}
			}
		}
	}

brain.prototype.update_graph_tables = function() // 2013.05.27
	{
	brain.graphs_protein_objects_are_initialised = 0; // flag to reset variables
	brain.graphs_peptide_objects_are_initialised = 0; // flag to reset variables

	var pool = document.getElementById(brain.layers.panel_proteins); // group of shown nodes
	var element1;
	var element2;
	var element3;

	var is_any_protein_selected = 0;
	var is_this_protein_selected = 0;

	element1 = pool.firstElementChild; // skip annoying nodes
	for (var i=0; i<brain.skip_nodes; i++)
		{
		element1 = element1.nextElementSibling;
		}

	while (element1) // transversing all the elements
		{
		element2 = element1.firstElementChild;
		accession:
		while (element2)
			{
			element3 = '';
			if (element2.className == 'container_prot_chk') // comes first, IMPORTANT, so the break comes later
				{
				if (element2.firstElementChild.firstElementChild.checked == true)
					{
					// when it finds the first, erases the proteins found before
					if (is_any_protein_selected == 0)
						{
						brain.graphs_protein_objects_are_initialised = 0; // flag to reset variables
						brain.graphs_peptide_objects_are_initialised = 0; // flag to reset variables
						}
					is_any_protein_selected = 1;
					is_this_protein_selected = 1;
					}
				}
			else if (element2.className == 'container_prot_uniprot' ||
					element2.className == 'container_prot_uniprot_remarked' ||
					element2.className == 'container_prot_uniprot_remarked_low' ||
					element2.className == 'container_prot_uniprot_remarked_moderate' ||
					element2.className == 'container_prot_uniprot_remarked_moderate2' ||
					element2.className == 'container_prot_uniprot_remarked_high') 
				{
				element3 = 'acc'+element2.firstElementChild.firstElementChild.textContent; // accession
				break accession;
				}
			element2 = element2.nextElementSibling;
			}

		// if we are not looking at the selected proteins, or
		// if we are looking at the selected proteins, and this one is selected
		element3 = element3.replace(/\s/g,''); // remove white spaces
		if ((element3 != 'accunassigned' && !is_any_protein_selected && element3 != '') || // 'acc' + 'unassigned'
			(is_this_protein_selected && is_any_protein_selected))
			{
			brain.calculate_graph_protein_tables(brain.proteins[element3]);

			for (j in brain.proteins[element3].peptides) // each entry is a peptide
				{
				brain.calculate_graph_peptide_tables(brain.proteins[element3].peptides[j].files[0],brain.proteins[element3].peptides[j]);
				}
			is_this_protein_selected = 0;
			}
		element1 = element1.nextElementSibling;
		}

	brain.calculations = 1; // tables updated
	}


//...................................................

brain.prototype.kernel = function(files) // when a file is dragged this is the function initialised, 2013.10.10
	{
	brain.transition_reading_finished = function()			{console.log('reading files ...');brain.reading_files(files);}
	brain.reading_files_finished = function()				{console.log('...');brain.transition_converting_csv();}
	brain.transition_converting_csv_finished = function()	{console.log('converting csv ...');brain.converting_csv();}
	brain.converting_csv_finished = function()				{console.log('...');brain.transition_converting_xml();}
	brain.transition_converting_xml_finished = function()	{console.log('converting xml ...');brain.converting_xml();}
	brain.converting_xml_finished = function()
		{
		console.log('finalising ...');
		brain.layers_css.progress_converting_xml.display = 'none';

		for (var k=0;k<brain.data.xhtml_code.length;k++)
			{
			document.getElementById(brain.layers.panel_proteins).appendChild(brain.data.xhtml_code[k]);
			}

		delete brain.data.xhtml_code;

		document.getElementById(brain.layers.to_add_control_panels).appendChild(document.getElementById(brain.layers.panel_selecting_files_to_be_moved));
		document.getElementById(brain.layers.to_add_control_panels).style.display = 'block';
		document.getElementById(brain.layers.panel_selecting_files_to_be_moved).style.display = 'block';
		document.getElementById('number_or_proteins').textContent = brain.total_number_of_proteins; // total number of proteins

		// if selected to not to colour, do not do (now yes, last part)
		document.getElementById('total_proteins_and_peptides').innerHTML = ''
							+'<br />'+brain.total_number_of_proteins+' identified proteins'
							+'<br />'+brain.total_number_of_proteins_marked+' proteins that appear in the database'
							+' ('+brain.total_number_of_proteins_marked_less_than+' at concentrations less than 100 ng/ml)';

		if (brain.total_number_of_peptides > 0)
			{
			document.getElementById('total_proteins_and_peptides').innerHTML += ''
							+'<br />'+brain.total_number_of_peptides+' identified peptides'
							+' ('+brain.total_number_of_peptides_non_asigned+' not assigned)';

			if (brain.total_number_of_analysis.length == 1)
				{
				var MC_percentage = parseInt(10000*brain.total_number_of_peptides_with_zero_MC/brain.total_number_of_peptides)/100;
				var MODs_percentage = parseInt(10000*brain.total_number_of_modified_peptides/brain.total_number_of_peptides)/100;
				var MODs_noCAM_percentage = parseInt(10000*brain.total_number_of_peptides_with_mods_without_CAM/brain.total_number_of_peptides)/100;
				document.getElementById('total_proteins_and_peptides').innerHTML += ''
							+'<br />'+MC_percentage+' % of the peptides have zero missed cleavages'
							+'<br />'+MODs_percentage+' % of peptides are modified'
							+'<br />'+MODs_noCAM_percentage+' % of peptides are modified without including carbamidomethyl';
				}
			}

		this.layers_css.container_pp.display = 'block';
		var final_width = parseInt(window.getComputedStyle(document.getElementById('calculate_width'),null).width.slice(0,-2));
		document.getElementById('calculate_width').style.height = '0px'; // if it has height 0 from the beginning, in windows (not in mac) it doesn't work
		if (final_width < 1208) {final_width = 1208;}
		document.getElementById('wrapper').style.width = (final_width+3)+'px';
		brain.layers_css.panel3.display = 'block';
		
		if (!brain.proteins_analysed)
			{
			document.getElementById('panel_graphs_proteins').style.display = 'none';
			document.getElementById('panel_graphs_select_files').style.display = 'none';
			document.getElementById('panel_graphs_proteins_comparison').style.display = 'none';
			}
		if (!brain.peptides_analysed)
			{
			document.getElementById('panel_graphs_peptides_and_LC').style.display = 'none';
			document.getElementById('panel_graphs_MS').style.display = 'none';
			}

		if (brain.files_analised == 1) // if there is only 1 file, there are no checkbox to be checked
			{
			document.getElementById('checkboxes_1').style.display = 'none';
			document.getElementById('panel_graphs_select_files').style.display = 'none';
			}
		}

	document.getElementById('help_panel').style.display = 'none';
	document.getElementById('files_help_panel').style.display = 'none';
	document.getElementById('options').style.display = 'none';

	document.getElementById('init_help').style.display = 'none';
	document.getElementById('init_files_help').style.display = 'none';
	document.getElementById('init_options').style.display = 'none';

	brain.transition_reading();
	}

//...................................................

function handleFileSelect(evt) // javascript linked to the webpage, 2012.10.12
	{
	evt.stopPropagation();
	evt.preventDefault();

	var file = evt.dataTransfer.files; // FileList object.
	for (var i = 0, f; f = file[i]; i++)
		{
		files.push(f); // files variable initialised in the first function
		var name = f.name.slice(-8);

		if (name == 'psms.txt')
			{
			var ref_node = document.getElementById('files_added_pep');
			}
		else if (name == 'oups.txt')
			{
			var ref_node = document.getElementById('files_added_prot');
			}

		var new_text_node = document.getElementById('files_added_text').cloneNode(true);
		new_text_node.id = new_text_node.id+i; // if dragged in different rounds, the i will be the same, but no problem since will not be cloned
		new_text_node.textContent += ': '+f.name;

		var new_file = ref_node.cloneNode(true);
		new_file.id = new_file.id+i; // if dragged in different rounds, the i will be the same, but no problem since will not be cloned
		new_file.style.display = 'block';

		var child_to_replace;
		for (f in new_file.childNodes)
			{
			if (new_file.childNodes[f].id == 'files_added_text') child_to_replace = new_file.childNodes[f];
			}
		new_file.replaceChild(new_text_node,child_to_replace);
		ref_node.parentNode.insertBefore(new_file,ref_node);
		}
	}

function handleDragOver(evt) // javascript linked to the webpage, 2012.10.12
	{
	evt.stopPropagation();
	evt.preventDefault();
	}

function initialise() // init functions
	{ 
	window.brain = new brain(); // now brain is a global variable
	brain.graphs_protein_objects_are_initialised = 0; // flag to reset variables
	brain.initiate_xslt(); // initiate xslt variables, for a faster execution

	var dropZone = document.getElementById(brain.layers.drag);
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);

	window.files = new Array();
	}

document.addEventListener("DOMContentLoaded",initialise,false);

//...................................................
//...................................................
//...................................................
//...................................................
// functions in response to events

// this object must exist since the beginning
var events_data = new Object();
events_data.not_redundancy = 1; // we use one entry per scan number
events_data.dragging = new Object();

function events() {}

events.prototype.start = function() // 2013.05.05 | EXTERNAL FUNCTION
	{
	var to_hide = document.getElementsByClassName('files_added');
 	for (var i = 0; i < to_hide.length; i++)
		{
		to_hide.item(i).style.display = 'none';
		}
	
	brain.kernel(files);
	}

events.prototype.redundant_peptides = function(ref,ref2,redundant) // 2011.12.21 | EXTERNAL FUNCTION
	{
	events_data.not_redundancy = redundant;
	if (ref.className == 'button')
		{
		ref.className = 'button selected';
		ref2.className = 'button';
		}
	else
		{
		ref.className = 'button';
		ref2.className = 'button selected';
		}
	}

events.prototype.view_peptides = function(ref,ref2) // 2013.05.02
	{
	events.select_protein(ref2); // to counteract the select_protein event when clicked

	// view or hide the peptides section
	var prot = ref.parentNode.parentNode.parentNode; // hitX.n node
	if (prot.lastElementChild.style.display == 'none')
		{
		prot.lastElementChild.style.display = 'block';
		prot.style.height = '100%';
		}
	else
		{
		prot.lastElementChild.style.display = 'none';
		prot.style.height = '14px';
		}

//	// and also, each time we click the cross, there is an event selecting the protein. So I send the same event again, to counteract it
//	nodes.select_this_protein(prot.firstElementChild.nextElementSibling.firstElementChild.firstElementChild);
	}

events.prototype.view_other_files = function(ref,ref2) // 2013.04.25
	{
	events.select_protein(ref2); // to counteract the select_protein event when clicked

	// change the height from fixed to non-determined
	var prot = ref.parentNode.parentNode.parentNode.parentNode;
	if (prot.style.height == '14px')
		{
		prot.style.height = '100%';
		}
	else
		{
		prot.style.height = '14px';
		}
	}

events.prototype.sort_data = function(ref,div,rev) // 2013.05.26
	{
	// sort data of the panel, first gather all data, then sort, then add again
	var pool = document.getElementById(brain.layers.panel_proteins); // group of nodes
	var container = ref.parentNode.parentNode.parentNode.className; // to define which container is the selected, container_prot_vars or container_prot_file_vars
	container = container.split(" ")[0]; // to get rid of "protein_0" class
	var list = new Array(); // list of the values and nodes

	var element1 = pool.firstElementChild;
	for (var i=0; i<brain.skip_nodes; i++)
		{
		element1 = element1.nextElementSibling;
		}

	var element2;
	var element3;
	var i = 0;

	while (element1) // transversing all the elements
		{
		element2 = element1.firstElementChild
		while (element2)
			{
			if (element2.className == container) 
				{
				element3 = element2.firstElementChild.firstElementChild;
				while (element3)
					{
					if (element3.className == div)
						{
						list[i] = new Object();
						list[i].id = element1.id;
						if (div == 'prot_cover' || div == 'prot_area_percentage')
							{
							if (!isNaN(element3.textContent.slice(0,-2))) list[i].value = element3.textContent.slice(0,-2);
							else list[i].value = 0;
							}
						else
							{
							if (!isNaN(element3.textContent)) list[i].value = element3.textContent;
							else list[i].value = 0;
							}
						i++;
						break;
						}
					element3 = element3.nextElementSibling;
					}
				break;
				}
			element2 = element2.nextElementSibling;
			}
		element1 = element1.nextElementSibling;
		}

	if (rev)
		{
		list.sort(function (a,b) {
				return (a.value-b.value);
				});
		}
	else
		{
		list.sort(function (a,b) {
				return (b.value-a.value);
				});
		}
	
	var num = 1; // to update the numeration
	for (var i in list)
		{
		if (document.getElementById(list[i].id).firstElementChild.firstElementChild.className == 'prot_n') // in case the order of the div change
			{
			document.getElementById(list[i].id).firstElementChild.firstElementChild.textContent = num-1; // 'prot_n'
			}
		num++;
		pool.appendChild(document.getElementById(list[i].id));
		}
	}

events.prototype.select_group = function(ref,total) // 2013.05.17
	{
	// select a combination, change the buttons, and re-add the proteins
	var class_button = 'button';
	var class_button_selected = 'button selected';
	var pool = document.getElementById(brain.layers.panel_proteins); // group of nodes
	var buffer = document.getElementById(brain.layers.buffer_proteins); // group of nodes for temporal buffer purposes
	var unselected = document.getElementById(brain.layers.unselected_proteins); // group of nodes for temporal buffer purposes

	// change the buttons classes
	var i = ref.id.slice(ref.id.lastIndexOf('_')+1);
	document.getElementById('control_panel_container_and_'+i).className = class_button;
	document.getElementById('control_panel_container_or_'+i).className = class_button;
	document.getElementById('control_panel_container_not_'+i).className = class_button;
	ref.className = class_button_selected;

	// create a matrix with the composition of the buttons (after these have been changed!). Each row -> a file, storing 1,0,-1
	var combinations = new Array();
	var at_least_one_file_NOT = 1;
	for (var i=1; i<=total; i++) // _0 does not exist
		{
		if (document.getElementById('control_panel_container_and_'+i).className == class_button_selected)
			{
			combinations[i] = 0;
			}
		else if (document.getElementById('control_panel_container_or_'+i).className == class_button_selected)
			{
			combinations[i] = 1;
			}
		else if (document.getElementById('control_panel_container_not_'+i).className == class_button_selected)
			{
			combinations[i] = 2;
			at_least_one_file_NOT = 0; // so "unassigned peptides" protein node will not be there -> not to be rested
			}
		}

	// put all nodes in a common place to start with all of them, the ones of the main place and the other of the unselected place
	var element1 = pool.firstElementChild;
	while (element1)
		{
		buffer.appendChild(element1);
		element1 = pool.firstElementChild; // the previous first element has been removed!
		}


	var element1 = unselected.firstElementChild;
	while (element1)
		{
		buffer.appendChild(element1);
		element1 = unselected.firstElementChild; // the previous first element has been removed!
		}

	// move the useless nodes
	for (var i=0; i<brain.skip_nodes; i++)
		{
		pool.appendChild(buffer.firstElementChild);
		}

	var element1 = buffer.firstElementChild;
	var element2;
	var element2n;
	var discard; // variable to temporaly store if a protein is discarded from the selection

	var num = 1; // to update the numeration
	new_element:
	while (element1)
		{
		element2 = element1.firstElementChild;
		while (element2)
			{
			if (element2.firstElementChild && element2.firstElementChild.className == 'prot_analysis')
				{
				element2n = element2.firstElementChild.firstElementChild; // first of the files that the protein has

				// create an array of all files, 0 if this protein is not there, 1 if this protein is there *starting at 1 as before
				var found = new Array();
				for (var i=1; i<=total; i++) found[i] = 0;

				// set where this protein has been found
				while (element2n)
					{
					var i = element2n.className.slice(element2n.className.lastIndexOf('_')+1);
					found[i] = 1;
					element2n = element2n.nextElementSibling;
					}

				// cross with the user wishes
				for (var n=1; n<=total; n++)
					{
					if (combinations[n] == '0' && found[n] == 0) {discard = 1;} // AND and the file has not been found in this hit, discard
					if (combinations[n] == '2' && found[n] == 1) {discard = 1;} // NOT and the file has been found in this hit, discard
					}

				// discard if not selected, and the other way around
				if (discard == 1)
					{
					unselected.appendChild(element1);
					}
				else
					{
					if (element1.firstElementChild.firstElementChild.className == 'prot_n')
						{
						element1.firstElementChild.firstElementChild.textContent = num; // 'prot_n'
						}
					num++;
					pool.appendChild(element1);
					}

				element1 = buffer.firstElementChild;
				discard = 0;
				continue new_element;
				}
			element2 = element2.nextElementSibling;
			}
		element1 = buffer.firstElementChild;
		}

	// unassigned peptides are present in all files. So if there is one file that has not to be there, unassigned will neither be there

	document.getElementById('number_or_proteins').textContent = num-1-at_least_one_file_NOT; // total number of proteins, eliminate also the node of unassigned peptides
	brain.calculations = 0; // graphs tables will have to be updated now
	}

events.prototype.view_graphs = function(graph_type,graph_chosen,op_var) // 2013.10.12
	{

//	var graph_data = new Array();
//	var graph_serie = new Array();

	brain.chosen_file1_for_graphing = null; // to reset the variables
	brain.chosen_file2_for_graphing = null;
	brain.chosen_file1_for_graphing_name;
	brain.chosen_file2_for_graphing_name;

	brain.graphs.last_graph;
	brain.graphs.last_other;
	brain.graphs.name1 = new Object();
	brain.graphs.name11 = new Object();
	brain.graphs.name12 = new Object();
	brain.graphs.name13 = new Object();
	brain.graphs.name2 = new Object();
	brain.graphs.name3 = new Object();
	brain.graphs.type = new Object();
	brain.graphs.tick_x = new Object();
	brain.graphs.tick_y = new Object();
	brain.graphs.radius = new Object();
	brain.graphs.min_x = new Object();
	brain.graphs.max_x = new Object();
	brain.graphs.min_y = new Object();
	brain.graphs.max_y = new Object();
	brain.graphs.style_x = new Object();
	brain.graphs.symbol = new Object();
	brain.graphs.funct = new Object();
	brain.graphs.title_x = new Object();
	brain.graphs.title_y = new Object();
	brain.graphs.graph = new Object();
	var multiple = 0;

	brain.graphs.colours =	new Array();
	brain.graphs.colours[0] = 'rgba(255, 55, 0, .5)'; // last value is opacity
	brain.graphs.colours[1] = 'rgba(255, 119, 0, .5)';
	brain.graphs.colours[2] = 'rgba(255, 187, 0, .5)';
	brain.graphs.colours[3] = 'rgba(255, 234, 0, .5)';
	brain.graphs.colours[4] = 'rgba(0, 229, 255, .5)';
	brain.graphs.colours[5] = 'rgba(0, 166, 255, .5)';
	brain.graphs.colours[6] = 'rgba(0, 98, 255, .5)';
	brain.graphs.colours[7] = 'rgba(0, 17, 255, .5)';
	brain.graphs.colours[8] = 'rgba(123, 130, 224, .5)';
	brain.graphs.colours[9] = 'rgba(123, 171, 224, .5)';
	brain.graphs.colours[10] = 'rgba(180, 205, 209, .5)';

	var found = 0;
	// if multiple files and the checkbox exist
	if (brain.files_analised > 1 && document.getElementById(graph_chosen+1)) // if there exist the checkbox for that graph
		{
		brain.calculations = 0; // re-calculate always when there is a checkbox. Otherwise I should keep track of the previous selection
		for (var j=1; j<=brain.files_analised; j++) // 1 because matrix[0] is the accession, [1] is the first file, and so on
			{
			if (document.getElementById(graph_chosen+j).checked == true) // also starting with 1
				{
				if (found == 0)
					{
					brain.chosen_file1_for_graphing = j;
					brain.chosen_file1_for_graphing_name = document.getElementById(graph_chosen+j).title; 
					found = 1;
					}
				else if (found == 1)
					{
					if (graph_chosen == 'dynamic_pie_check_' || graph_chosen == 'dynamic_ratios_check_')
						{
						document.getElementById(graph_chosen+j).checked = false;
						alert('maximum of 1 file, uncheck one file and try again');
						}
					else
						{
						brain.chosen_file2_for_graphing = j;
						brain.chosen_file2_for_graphing_name = document.getElementById(graph_chosen+j).title; 
						found = 2;
						}
					}
				else
					{
					if (graph_chosen == 'dynamic_check_' 
					|| graph_chosen == 'comparison_check_' 
					|| graph_chosen == 'comparison_score_check_' 
					|| graph_chosen == 'comparison_peptides_check_'
					|| graph_chosen == 'orthogonality_')
						{
						document.getElementById(graph_chosen+j).checked = false;
						alert('maximum of 2 files, uncheck one file and try again');
						}
					}
				}
			}
		}

	if (brain.files_analised == 1 && document.getElementById(graph_chosen+1)) // if there is only 1 file, there are no checkbox to be checked
		{
		brain.chosen_file1_for_graphing = 1;
		brain.chosen_file1_for_graphing_name = document.getElementById(graph_chosen+1).title;
		}


	if (graph_type == 'peptides_rt'
	|| graph_type == 'peptides_area_rt'
	|| graph_type == 'charge_rt'
	|| graph_type == 'charge_rt_mod'
	|| graph_type == 'charge_area_rt'
	|| graph_type == 'charge_area_rt_mod'
	|| graph_type == 'missed_rt'
	|| graph_type == 'missed_rt_mod'
	|| graph_type == 'missed_area_rt'
	|| graph_type == 'missed_area_rt_mod'
	|| graph_type == 'peptides_mods_rt'
	|| graph_type == 'peptides_mods_area_rt')
		{
		events.internal_graphs_peptides_rt(graph_type,graph_chosen,op_var);
		}
	else if (graph_type == 'peptides_mass'
	|| graph_type == 'peptides_area_mass'
	|| graph_type == 'charge_mass'
	|| graph_type == 'charge_mass_mod'
	|| graph_type == 'charge_area_mass'
	|| graph_type == 'charge_area_mass_mod'
	|| graph_type == 'missed_mass'
	|| graph_type == 'missed_mass_mod'
	|| graph_type == 'missed_area_mass'
	|| graph_type == 'missed_area_mass_mod'
	|| graph_type == 'peptides_mods_mass'
	|| graph_type == 'peptides_mods_area_mass')
		{
		events.internal_graphs_peptides_mass(graph_type,graph_chosen,op_var);
		}
	else if (graph_type == 'iit_rt'
	|| graph_type == 'iit_rt_mod'
	|| graph_type == 'delta_rt'
	|| graph_type == 'delta_rt_mod'
	|| graph_type == 'score_rt'
	|| graph_type == 'score_rt_mod'
	|| graph_type == 'iit_mass'
	|| graph_type == 'iit_mass_mod'
	|| graph_type == 'score_mass'
	|| graph_type == 'score_mass_mod'
	|| graph_type == 'delta_mass'
	|| graph_type == 'delta_mass_mod')
		{
		events.internal_graphs_peptides_scatter(graph_type,graph_chosen,op_var);
		}
	else if (graph_type == 'prot_relative_dynamic_range'
	|| graph_type == 'prot_absolute_dynamic_range'
	|| graph_type == 'prot_relative_dynamic_range_pie'
	|| graph_type == 'prot_relative_dynamic_range_ratios'
	|| graph_type == 'prot_relative_comparison_area'
	|| graph_type == 'prot_absolute_comparison_area'
	|| graph_type == 'prot_absolute_comparison_score'
	|| graph_type == 'prot_absolute_comparison_peptides')
		{
		events.internal_graphs_proteins_comparisons(graph_type,graph_chosen,op_var);
		}
	else if (graph_type == 'prot_relative_files_areas'
	|| graph_type == 'prot_absolute_files_areas'
	|| graph_type == 'prot_absolute_files_scores'
	|| graph_type == 'prot_files_lists')
		{
		events.internal_graphs_proteins_global_comparisons(graph_type,graph_chosen,op_var);
		}
	else if (graph_type == 'MW_prot'
	|| graph_type == 'MW_area'
	|| graph_type == 'MW_pep_unique'
	|| graph_type == 'PI_prot'
	|| graph_type == 'PI_area'
	|| graph_type == 'PI_pep_unique'
	|| graph_type == 'MW_PI'
	|| graph_type == 'MW_score'
	|| graph_type == 'PI_score')
		{
		events.internal_graphs_proteins_MW_PI(graph_type,graph_chosen,op_var);
		}
	else if (graph_type == 'proteins_rt'
	|| graph_type == 'pep_rt_comparison')
		{
		events.internal_graphs_chromatography(graph_type,graph_chosen,op_var);
		}

	if (brain.calculations != 1)
		{
		brain.update_graph_tables();
		brain.exponencial_conversion_done = 0;
		brain.orthogonality_conversion_done = 0;
		}

	brain.graphs.graph[graph_type]();
	}

events.prototype.internal_graphs_peptides_rt = function(graph_type,graph_chosen,op_var) // 2013.05.25
	{

	// PEPTIDES
	// ------------------------------------------------------------
	// AREA GRAPHS

	var label = function() {return this.series.name+brain.graphs.name2[graph_type]+this.x+brain.graphs.name3[graph_type]+this.y;}

	brain.graphs.name1['peptides_rt'] = 'All | UNIQUE | MODIFIED number of peptides vs RT';
	brain.graphs.name11['peptides_rt'] = 'ALL peptides';
	brain.graphs.name12['peptides_rt'] = 'UNIQUE peptides';
	brain.graphs.name13['peptides_rt'] = 'MODIFIED peptides';
	brain.graphs.name2['peptides_rt'] = '<br/>minutes: ';
	brain.graphs.name3['peptides_rt'] = '<br/>peptides: ';
	brain.graphs.title_x['peptides_rt'] = 'retention time (min)';
	brain.graphs.title_y['peptides_rt'] = 'number of peptides';
	brain.graphs.type['peptides_rt'] = 'area';
	brain.graphs.tick_x['peptides_rt'] = 20;
	brain.graphs.funct['peptides_rt'] = label;
	brain.graphs.graph['peptides_rt'] =	function() {
		brain.internal_array_check(brain.graphs.peptide_table.RT_total_peptides,brain.num_rt);
		brain.internal_array_check(brain.graphs.peptide_table.RT_unique_peptides,brain.num_rt);
		brain.internal_array_check(brain.graphs.peptide_table.RT_total_peptides_mod,brain.num_rt);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.RT_total_peptides,
			brain.graphs.peptide_table.RT_unique_peptides,
			brain.graphs.peptide_table.RT_total_peptides_mod);};

	brain.graphs.name1['peptides_area_rt'] = 'All | MODIFIED areas of peptides vs RT';
	brain.graphs.name11['peptides_area_rt'] = 'TOTAL peptide areas';
	brain.graphs.name12['peptides_area_rt'] = 'MODIFIED peptide areas';
	brain.graphs.name2['peptides_area_rt'] = '<br/>minutes: ';
	brain.graphs.name3['peptides_area_rt'] = '<br/>sum of areas: ';
	brain.graphs.title_x['peptides_area_rt'] = 'retention time (min)';
	brain.graphs.title_y['peptides_area_rt'] = 'sum of peptide areas';
	brain.graphs.type['peptides_area_rt'] = 'area';
	brain.graphs.tick_x['peptides_area_rt'] = 20;
	brain.graphs.funct['peptides_area_rt'] = label;
	brain.graphs.graph['peptides_area_rt'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.RT_total_peptides_total_area,brain.num_rt);
		brain.internal_array_check(brain.graphs.peptide_table.RT_total_peptides_total_area_mod,brain.num_rt);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.RT_total_peptides_total_area,
			brain.graphs.peptide_table.RT_total_peptides_total_area_mod);};







	brain.graphs.name1['charge_rt'] = 'Number of peptides grouped by charges vs RT';
	brain.graphs.name11['charge_rt'] = 'ALL peptides';
	brain.graphs.name12['charge_rt'] = 'PEPTIDES with charge: +';
	brain.graphs.name13['charge_rt'] = '';
	brain.graphs.name2['charge_rt'] = '<br/>minutes: ';
	brain.graphs.name3['charge_rt'] = '<br/>peptides: ';
	brain.graphs.title_x['charge_rt'] = 'retention time (min)';
	brain.graphs.title_y['charge_rt'] = 'number of peptides';
	brain.graphs.type['charge_rt'] = 'area';
	brain.graphs.tick_x['charge_rt'] = 20;
	brain.graphs.funct['charge_rt'] = label;
	brain.graphs.graph['charge_rt'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.RT_total_peptides,brain.num_rt);
		brain.internal_array_check(brain.graphs.peptide_table.RT_charges,brain.num_rt);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.RT_total_peptides,
			brain.graphs.peptide_table.RT_charges);};

	brain.graphs.name1['charge_rt_mod'] = 'Number of MODIFIED peptides grouped by charges vs RT';
	brain.graphs.name11['charge_rt_mod'] = 'ALL peptides';
	brain.graphs.name12['charge_rt_mod'] = 'PEPTIDES with charge: +';
	brain.graphs.name13['charge_rt_mod'] = '';
	brain.graphs.name2['charge_rt_mod'] = '<br/>minutes: ';
	brain.graphs.name3['charge_rt_mod'] = '<br/>peptides: ';
	brain.graphs.title_x['charge_rt_mod'] = 'retention time (min)';
	brain.graphs.title_y['charge_rt_mod'] = 'number of peptides';
	brain.graphs.type['charge_rt_mod'] = 'area';
	brain.graphs.tick_x['charge_rt_mod'] = 20;
	brain.graphs.funct['charge_rt_mod'] = label;
	brain.graphs.graph['charge_rt_mod'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.RT_total_peptides_mod,brain.num_rt);
		brain.internal_array_check(brain.graphs.peptide_table.RT_charges_mod,brain.num_rt);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.RT_total_peptides_mod,
			brain.graphs.peptide_table.RT_charges_mod);};

	brain.graphs.name1['charge_area_rt'] = 'Areas of peptides grouped by charges vs RT';
	brain.graphs.name11['charge_area_rt'] = 'TOTAL peptide areas';
	brain.graphs.name12['charge_area_rt'] = 'PEPTIDE AREAS with charge: +';
	brain.graphs.name13['charge_area_rt'] = '';
	brain.graphs.name2['charge_area_rt'] = '<br/>minutes: ';
	brain.graphs.name3['charge_area_rt'] = '<br/>sum of areas: ';
	brain.graphs.title_x['charge_area_rt'] = 'retention time (min)';
	brain.graphs.title_y['charge_area_rt'] = 'sum of peptide areas';
	brain.graphs.type['charge_area_rt'] = 'area';
	brain.graphs.tick_x['charge_area_rt'] = 20;
	brain.graphs.funct['charge_area_rt'] = label;
	brain.graphs.graph['charge_area_rt'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.RT_total_peptides_total_area,brain.num_rt);
		brain.internal_array_check(brain.graphs.peptide_table.RT_charges_area,brain.num_rt);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.RT_total_peptides_total_area,
			brain.graphs.peptide_table.RT_charges_area);};

	brain.graphs.name1['charge_area_rt_mod'] = 'Areas of MODIFIED peptides grouped by charges vs RT';
	brain.graphs.name11['charge_area_rt_mod'] = 'TOTAL peptide areas';
	brain.graphs.name12['charge_area_rt_mod'] = 'PEPTIDE AREAS with charge: +';
	brain.graphs.name13['charge_area_rt_mod'] = '';
	brain.graphs.name2['charge_area_rt_mod'] = '<br/>minutes: ';
	brain.graphs.name3['charge_area_rt_mod'] = '<br/>sum of areas: ';
	brain.graphs.title_x['charge_area_rt_mod'] = 'retention time (min)';
	brain.graphs.title_y['charge_area_rt_mod'] = 'sum of peptide areas';
	brain.graphs.type['charge_area_rt_mod'] = 'area';
	brain.graphs.tick_x['charge_area_rt_mod'] = 20;
	brain.graphs.funct['charge_area_rt_mod'] = label;
	brain.graphs.graph['charge_area_rt_mod'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.RT_total_peptides_total_area_mod,brain.num_rt);
		brain.internal_array_check(brain.graphs.peptide_table.RT_charges_area_mod,brain.num_rt);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.RT_total_peptides_total_area_mod,
			brain.graphs.peptide_table.RT_charges_area_mod);};







	brain.graphs.name1['missed_rt'] = 'Number of peptides grouped by missed cleavages vs RT';
	brain.graphs.name11['missed_rt'] = 'ALL peptides';
	brain.graphs.name12['missed_rt'] = 'PEPTIDES with ';
	brain.graphs.name13['missed_rt'] = ' missed cleavages';
	brain.graphs.name2['missed_rt'] = '<br/>minutes: ';
	brain.graphs.name3['missed_rt'] = '<br/>peptides: ';
	brain.graphs.title_x['missed_rt'] = 'retention time (min)';
	brain.graphs.title_y['missed_rt'] = 'number of peptides';
	brain.graphs.type['missed_rt'] = 'area';
	brain.graphs.tick_x['missed_rt'] = 20;
	brain.graphs.funct['missed_rt'] = label;
	brain.graphs.graph['missed_rt'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.RT_total_peptides,brain.num_rt);
		brain.internal_array_check(brain.graphs.peptide_table.RT_missed_peptides,brain.num_rt);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.RT_total_peptides,
			brain.graphs.peptide_table.RT_missed_peptides);};

	brain.graphs.name1['missed_rt_mod'] = 'Number of MODIFIED peptides grouped by missed cleavages vs RT';
	brain.graphs.name11['missed_rt_mod'] = 'ALL peptides';
	brain.graphs.name12['missed_rt_mod'] = 'PEPTIDES with ';
	brain.graphs.name13['missed_rt_mod'] = ' missed cleavages';
	brain.graphs.name2['missed_rt_mod'] = '<br/>minutes: ';
	brain.graphs.name3['missed_rt_mod'] = '<br/>peptides: ';
	brain.graphs.title_x['missed_rt_mod'] = 'retention time (min)';
	brain.graphs.title_y['missed_rt_mod'] = 'number of peptides';
	brain.graphs.type['missed_rt_mod'] = 'area';
	brain.graphs.tick_x['missed_rt_mod'] = 20;
	brain.graphs.funct['missed_rt_mod'] = label;
	brain.graphs.graph['missed_rt_mod'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.RT_total_peptides_mod,brain.num_rt);
		brain.internal_array_check(brain.graphs.peptide_table.RT_missed_peptides_mod,brain.num_rt);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.RT_total_peptides_mod,
			brain.graphs.peptide_table.RT_missed_peptides_mod);};

	brain.graphs.name1['missed_area_rt'] = 'Areas of peptides grouped by missed cleavages vs RT';
	brain.graphs.name11['missed_area_rt'] = 'TOTAL peptide areas';
	brain.graphs.name12['missed_area_rt'] = 'PEPTIDE AREAS with ';
	brain.graphs.name13['missed_area_rt'] = ' missed cleavages';
	brain.graphs.name2['missed_area_rt'] = '<br/>minutes: ';
	brain.graphs.name3['missed_area_rt'] = '<br/>sum of areas: ';
	brain.graphs.title_x['missed_area_rt'] = 'retention time (min)';
	brain.graphs.title_y['missed_area_rt'] = 'sum of peptide areas';
	brain.graphs.type['missed_area_rt'] = 'area';
	brain.graphs.tick_x['missed_area_rt'] = 20;
	brain.graphs.funct['missed_area_rt'] = label;
	brain.graphs.graph['missed_area_rt'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.RT_total_peptides_total_area,brain.num_rt);
		brain.internal_array_check(brain.graphs.peptide_table.RT_missed_peptides_total_area,brain.num_rt);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.RT_total_peptides_total_area,
			brain.graphs.peptide_table.RT_missed_peptides_total_area);};

	brain.graphs.name1['missed_area_rt_mod'] = 'Areas of MODIFIED peptides grouped by missed cleavages vs RT';
	brain.graphs.name11['missed_area_rt_mod'] = 'TOTAL peptide areas';
	brain.graphs.name12['missed_area_rt_mod'] = 'PEPTIDE AREAS with ';
	brain.graphs.name13['missed_area_rt_mod'] = ' missed cleavages';
	brain.graphs.name2['missed_area_rt_mod'] = '<br/>minutes: ';
	brain.graphs.name3['missed_area_rt_mod'] = '<br/>sum of areas: ';
	brain.graphs.title_x['missed_area_rt_mod'] = 'retention time (min)';
	brain.graphs.title_y['missed_area_rt_mod'] = 'sum of peptide areas';
	brain.graphs.type['missed_area_rt_mod'] = 'area';
	brain.graphs.tick_x['missed_area_rt_mod'] = 20;
	brain.graphs.funct['missed_area_rt_mod'] = label;
	brain.graphs.graph['missed_area_rt_mod'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.RT_total_peptides_total_area_mod,brain.num_rt);
		brain.internal_array_check(brain.graphs.peptide_table.RT_missed_peptides_total_area_mod,brain.num_rt);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.RT_total_peptides_total_area_mod,
			brain.graphs.peptide_table.RT_missed_peptides_total_area_mod);};





	brain.graphs.name1['peptides_mods_rt'] = 'Peptides with different modifications vs RT';
	brain.graphs.name11['peptides_mods_rt'] = 'ALL peptides';
	brain.graphs.name12['peptides_mods_rt'] = 'Mod: ';
	brain.graphs.name13['peptides_mods_rt'] = '';
	brain.graphs.name2['peptides_mods_rt'] = '<br/>minutes: ';
	brain.graphs.name3['peptides_mods_rt'] = '<br/>peptides: ';
	brain.graphs.title_x['peptides_mods_rt'] = 'retention time (min)';
	brain.graphs.title_y['peptides_mods_rt'] = 'number of peptides';
	brain.graphs.type['peptides_mods_rt'] = 'area';
	brain.graphs.tick_x['peptides_mods_rt'] = 20;
	brain.graphs.funct['peptides_mods_rt'] = label;
	brain.graphs.graph['peptides_mods_rt'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.RT_total_peptides,brain.num_rt);
		brain.internal_array_check(brain.graphs.peptide_table.modifications_rt,brain.num_rt);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.RT_total_peptides,
			brain.graphs.peptide_table.modifications_rt);};

	brain.graphs.name1['peptides_mods_area_rt'] = 'Areas of peptides grouped by different modifications vs RT';
	brain.graphs.name11['peptides_mods_area_rt'] = 'ALL peptides';
	brain.graphs.name12['peptides_mods_area_rt'] = 'Mod: ';
	brain.graphs.name13['peptides_mods_area_rt'] = '';
	brain.graphs.name2['peptides_mods_area_rt'] = '<br/>minutes: ';
	brain.graphs.name3['peptides_mods_area_rt'] = '<br/>sum of areas: ';
	brain.graphs.title_x['peptides_mods_area_rt'] = 'retention time (min)';
	brain.graphs.title_y['peptides_mods_area_rt'] = 'sum of peptide areas';
	brain.graphs.type['peptides_mods_area_rt'] = 'area';
	brain.graphs.tick_x['peptides_mods_area_rt'] = 20;
	brain.graphs.funct['peptides_mods_area_rt'] = label;
	brain.graphs.graph['peptides_mods_area_rt'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.RT_total_peptides_total_area,brain.num_rt);
		brain.internal_array_check(brain.graphs.peptide_table.modifications_total_area_rt,brain.num_rt);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.RT_total_peptides_total_area,
			brain.graphs.peptide_table.modifications_total_area_rt);};



	}

events.prototype.internal_graphs_peptides_mass = function(graph_type,graph_chosen,op_var) // 2013.05.25
	{
	var label = function() {return this.series.name+brain.graphs.name2[graph_type]+this.x+'-'+parseInt(this.x+100)+brain.graphs.name3[graph_type]+this.y;}

	brain.graphs.name1['peptides_mass'] = 'All | UNIQUE | MODIFIED number of peptides vs m/z';
	brain.graphs.name11['peptides_mass'] = 'ALL peptides';
	brain.graphs.name12['peptides_mass'] = 'UNIQUE peptides';
	brain.graphs.name13['peptides_mass'] = 'MODIFIED peptides';
	brain.graphs.name2['peptides_mass'] = '<br/>m/z: ';
	brain.graphs.name3['peptides_mass'] = '<br/>peptides: ';
	brain.graphs.title_x['peptides_mass'] = 'mass (m/z)';
	brain.graphs.title_y['peptides_mass'] = 'number of peptides';
	brain.graphs.type['peptides_mass'] = 'area';
	brain.graphs.tick_x['peptides_mass'] = 100;
	brain.graphs.funct['peptides_mass'] = label;
	brain.graphs.graph['peptides_mass'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.MW_total_peptides,brain.num_mass);
		brain.internal_array_check(brain.graphs.peptide_table.MW_unique_peptides,brain.num_mass);
		brain.internal_array_check(brain.graphs.peptide_table.MW_total_peptides_mod,brain.num_mass);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.MW_total_peptides,
			brain.graphs.peptide_table.MW_unique_peptides,
			brain.graphs.peptide_table.MW_total_peptides_mod);
			};


	brain.graphs.name1['peptides_area_mass'] = 'All | MODIFIED areas of peptides vs m/z';
	brain.graphs.name11['peptides_area_mass'] = 'TOTAL peptide areas';
	brain.graphs.name12['peptides_area_mass'] = 'MODIFIED peptide areas';
	brain.graphs.name2['peptides_area_mass'] = '<br/>m/z: ';
	brain.graphs.name3['peptides_area_mass'] = '<br/>sum of areas: ';
	brain.graphs.title_x['peptides_area_mass'] = 'mass (m/z)';
	brain.graphs.title_y['peptides_area_mass'] = 'sum of peptide areas';
	brain.graphs.type['peptides_area_mass'] = 'area';
	brain.graphs.tick_x['peptides_area_mass'] = 100;
	brain.graphs.funct['peptides_area_mass'] = label;
	brain.graphs.graph['peptides_area_mass'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.MW_total_peptides_total_area,brain.num_mass);
		brain.internal_array_check(brain.graphs.peptide_table.MW_total_peptides_total_area_mod,brain.num_mass);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.MW_total_peptides_total_area,
			brain.graphs.peptide_table.MW_total_peptides_total_area_mod);
			};
			

	brain.graphs.name1['charge_mass'] = 'Number of peptides grouped by charges vs m/z';
	brain.graphs.name11['charge_mass'] = 'ALL peptides';
	brain.graphs.name12['charge_mass'] = 'PEPTIDES with charge: +';
	brain.graphs.name13['charge_mass'] = '';
	brain.graphs.name2['charge_mass'] = '<br/>m/z: ';
	brain.graphs.name3['charge_mass'] = '<br/>peptides: ';
	brain.graphs.title_x['charge_mass'] = 'mass (m/z)';
	brain.graphs.title_y['charge_mass'] = 'number of peptides';
	brain.graphs.type['charge_mass'] = 'area';
	brain.graphs.tick_x['charge_mass'] = 200;
	brain.graphs.funct['charge_mass'] = label;
	brain.graphs.graph['charge_mass'] =	function() {
		brain.internal_array_check(brain.graphs.peptide_table.MW_total_peptides,brain.num_mass);
		brain.internal_array_check(brain.graphs.peptide_table.MW_charges,brain.num_mass);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.MW_total_peptides,
			brain.graphs.peptide_table.MW_charges);
			};

	brain.graphs.name1['charge_mass_mod'] = 'Number of MODIFIED peptides grouped by charges vs m/z';
	brain.graphs.name11['charge_mass_mod'] = 'ALL peptides';
	brain.graphs.name12['charge_mass_mod'] = 'PEPTIDES with charge: +';
	brain.graphs.name13['charge_mass_mod'] = '';
	brain.graphs.name2['charge_mass_mod'] = '<br/>m/z: ';
	brain.graphs.name3['charge_mass_mod'] = '<br/>peptides: ';
	brain.graphs.title_x['charge_mass_mod'] = 'mass (m/z)';
	brain.graphs.title_y['charge_mass_mod'] = 'number of peptides';
	brain.graphs.type['charge_mass_mod'] = 'area';
	brain.graphs.tick_x['charge_mass_mod'] = 200;
	brain.graphs.funct['charge_mass_mod'] = label;
	brain.graphs.graph['charge_mass_mod'] =	function() {
		brain.internal_array_check(brain.graphs.peptide_table.MW_total_peptides_mod,brain.num_mass);
		brain.internal_array_check(brain.graphs.peptide_table.MW_charges_mod,brain.num_mass);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.MW_total_peptides_mod,
			brain.graphs.peptide_table.MW_charges_mod);
			};

	brain.graphs.name1['charge_area_mass'] = 'Areas of peptides grouped by charges vs m/z';
	brain.graphs.name11['charge_area_mass'] = 'TOTAL peptide areas';
	brain.graphs.name12['charge_area_mass'] = 'PEPTIDE AREAS with charge: +';
	brain.graphs.name13['charge_area_mass'] = '';
	brain.graphs.name2['charge_area_mass'] = '<br/>m/z: ';
	brain.graphs.name3['charge_area_mass'] = '<br/>sum of areas: ';
	brain.graphs.title_x['charge_area_mass'] = 'mass (m/z)';
	brain.graphs.title_y['charge_area_mass'] = 'sum of peptide areas';
	brain.graphs.type['charge_area_mass'] = 'area';
	brain.graphs.tick_x['charge_area_mass'] = 200;
	brain.graphs.funct['charge_area_mass'] = label;
	brain.graphs.graph['charge_area_mass'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.MW_total_peptides_total_area,brain.num_mass);
		brain.internal_array_check(brain.graphs.peptide_table.MW_charges_area,brain.num_mass);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.MW_total_peptides_total_area,
			brain.graphs.peptide_table.MW_charges_area);
			};

	brain.graphs.name1['charge_area_mass_mod'] = 'Areas of MODIFIED peptides grouped by by charge vs m/z';
	brain.graphs.name11['charge_area_mass_mod'] = 'total areas';
	brain.graphs.name12['charge_area_mass_mod'] = 'PEPTIDE AREAS with charge: +';
	brain.graphs.name13['charge_area_mass_mod'] = '';
	brain.graphs.name2['charge_area_mass_mod'] = '<br/>m/z: ';
	brain.graphs.name3['charge_area_mass_mod'] = '<br/>sum of areas: ';
	brain.graphs.title_x['charge_area_mass_mod'] = 'mass (m/z)';
	brain.graphs.title_y['charge_area_mass_mod'] = 'sum of peptide areas';
	brain.graphs.type['charge_area_mass_mod'] = 'area';
	brain.graphs.tick_x['charge_area_mass_mod'] = 200;
	brain.graphs.funct['charge_area_mass_mod'] = label;
	brain.graphs.graph['charge_area_mass_mod'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.MW_total_peptides_total_area_mod,brain.num_mass);
		brain.internal_array_check(brain.graphs.peptide_table.MW_charges_area_mod,brain.num_mass);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.MW_total_peptides_total_area_mod,
			brain.graphs.peptide_table.MW_charges_area_mod);
			};









	brain.graphs.name1['missed_mass'] = 'Number of peptides grouped by missed cleavages vs m/z';
	brain.graphs.name11['missed_mass'] = 'ALL peptides';
	brain.graphs.name12['missed_mass'] = 'PEPTIDES with ';
	brain.graphs.name13['missed_mass'] = ' missed cleavages';
	brain.graphs.name2['missed_mass'] = '<br/>m/z: ';
	brain.graphs.name3['missed_mass'] = '<br/>peptides: ';
	brain.graphs.title_x['missed_mass'] = 'mass (m/z)';
	brain.graphs.title_y['missed_mass'] = 'number of peptides';
	brain.graphs.type['missed_mass'] = 'area';
	brain.graphs.tick_x['missed_mass'] = 200;
	brain.graphs.funct['missed_mass'] = label;
	brain.graphs.graph['missed_mass'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.MW_total_peptides,brain.num_mass);
		brain.internal_array_check(brain.graphs.peptide_table.MW_missed_peptides,brain.num_mass);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.MW_total_peptides,
			brain.graphs.peptide_table.MW_missed_peptides);
			};

	brain.graphs.name1['missed_mass_mod'] = 'Number of MODIFIED peptides grouped by missed cleavages vs m/z';
	brain.graphs.name11['missed_mass_mod'] = 'ALL peptides';
	brain.graphs.name12['missed_mass_mod'] = 'PEPTIDES with ';
	brain.graphs.name13['missed_mass_mod'] = ' missed cleavages';
	brain.graphs.name2['missed_mass_mod'] = '<br/>m/z: ';
	brain.graphs.name3['missed_mass_mod'] = '<br/>peptides: ';
	brain.graphs.title_x['missed_mass_mod'] = 'mass (m/z)';
	brain.graphs.title_y['missed_mass_mod'] = 'number of peptides';
	brain.graphs.type['missed_mass_mod'] = 'area';
	brain.graphs.tick_x['missed_mass_mod'] = 200;
	brain.graphs.funct['missed_mass_mod'] = label;
	brain.graphs.graph['missed_mass_mod'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.MW_total_peptides_mod,brain.num_mass);
		brain.internal_array_check(brain.graphs.peptide_table.MW_missed_peptides_mod,brain.num_mass);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.MW_total_peptides_mod,
			brain.graphs.peptide_table.MW_missed_peptides_mod);
			};

	brain.graphs.name1['missed_area_mass'] = 'Areas of peptides grouped by missed cleavages vs m/z';
	brain.graphs.name11['missed_area_mass'] = 'TOTAL peptide areas';
	brain.graphs.name12['missed_area_mass'] = 'PEPTIDE AREAS with ';
	brain.graphs.name13['missed_area_mass'] = ' missed cleavages';
	brain.graphs.name2['missed_area_mass'] = '<br/>m/z: ';
	brain.graphs.name3['missed_area_mass'] = '<br/>sum of areas: ';
	brain.graphs.title_x['missed_area_mass'] = 'mass (m/z)';
	brain.graphs.title_y['missed_area_mass'] = 'sum of peptide areas';
	brain.graphs.type['missed_area_mass'] = 'area';
	brain.graphs.tick_x['missed_area_mass'] = 200;
	brain.graphs.funct['missed_area_mass'] = label;
	brain.graphs.graph['missed_area_mass'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.MW_total_peptides_total_area,brain.num_mass);
		brain.internal_array_check(brain.graphs.peptide_table.MW_missed_peptides_total_area,brain.num_mass);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.MW_total_peptides_total_area,
			brain.graphs.peptide_table.MW_missed_peptides_total_area);
			};

	brain.graphs.name1['missed_area_mass_mod'] = 'Areas of MODIFIED peptides grouped by missed cleavages vs m/z';
	brain.graphs.name11['missed_area_mass_mod'] = 'TOTAL peptide areas';
	brain.graphs.name12['missed_area_mass_mod'] = 'PEPTIDE AREAS with ';
	brain.graphs.name13['missed_area_mass_mod'] = ' missed cleavages';
	brain.graphs.name2['missed_area_mass_mod'] = '<br/>m/z: ';
	brain.graphs.name3['missed_area_mass_mod'] = '<br/>sum of areas: ';
	brain.graphs.title_x['missed_area_mass_mod'] = 'mass (m/z)';
	brain.graphs.title_y['missed_area_mass_mod'] = 'sum of peptide areas';
	brain.graphs.type['missed_area_mass_mod'] = 'area';
	brain.graphs.tick_x['missed_area_mass_mod'] = 200;
	brain.graphs.funct['missed_area_mass_mod'] = label;
	brain.graphs.graph['missed_area_mass_mod'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.MW_total_peptides_total_area_mod,brain.num_mass);
		brain.internal_array_check(brain.graphs.peptide_table.MW_missed_peptides_total_area_mod,brain.num_mass);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.MW_total_peptides_total_area_mod,
			brain.graphs.peptide_table.MW_missed_peptides_total_area_mod);
			};








	brain.graphs.name1['peptides_mods_mass'] = 'Peptides with different modifications vs m/z';
	brain.graphs.name11['peptides_mods_mass'] = 'ALL peptides';
	brain.graphs.name12['peptides_mods_mass'] = 'Mod: ';
	brain.graphs.name13['peptides_mods_mass'] = '';
	brain.graphs.name2['peptides_mods_mass'] = '<br/>m/z: ';
	brain.graphs.name3['peptides_mods_mass'] = '<br/>peptides: ';
	brain.graphs.title_x['peptides_mods_mass'] = 'mass (m/z)';
	brain.graphs.title_y['peptides_mods_mass'] = 'number of peptides';
	brain.graphs.type['peptides_mods_mass'] = 'area';
	brain.graphs.tick_x['peptides_mods_mass'] = 200;
	brain.graphs.funct['peptides_mods_mass'] = label;
	brain.graphs.graph['peptides_mods_mass'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.MW_total_peptides,brain.num_mass);
		brain.internal_array_check(brain.graphs.peptide_table.modifications_mw,brain.num_mass);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.MW_total_peptides,
			brain.graphs.peptide_table.modifications_mw);
			};

	brain.graphs.name1['peptides_mods_area_mass'] = 'Areas of peptides grouped by different modifications vs m/z';
	brain.graphs.name11['peptides_mods_area_mass'] = 'ALL peptides';
	brain.graphs.name12['peptides_mods_area_mass'] = 'Mod: ';
	brain.graphs.name13['peptides_mods_area_mass'] = '';
	brain.graphs.name2['peptides_mods_area_mass'] = '<br/>m/z: ';
	brain.graphs.name3['peptides_mods_area_mass'] = '<br/>sum of areas: ';
	brain.graphs.title_x['peptides_mods_area_mass'] = 'mass (m/z)';
	brain.graphs.title_y['peptides_mods_area_mass'] = 'sum of peptide areas';
	brain.graphs.type['peptides_mods_area_mass'] = 'area';
	brain.graphs.tick_x['peptides_mods_area_mass'] = 200;
	brain.graphs.funct['peptides_mods_area_mass'] = label;
	brain.graphs.graph['peptides_mods_area_mass'] = function() {
		brain.internal_array_check(brain.graphs.peptide_table.MW_total_peptides_total_area,brain.num_mass);
		brain.internal_array_check(brain.graphs.peptide_table.modifications_total_area_mw,brain.num_mass);
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.MW_total_peptides_total_area,
			brain.graphs.peptide_table.modifications_total_area_mw);
			};

	}

events.prototype.internal_graphs_chromatography = function(graph_type,graph_chosen,op_var) // 2013.05.25
	{
	var label = function() {return this.series.name+brain.graphs.name2[graph_type]+this.x+brain.graphs.name3[graph_type]+this.y;}

	brain.graphs.name1['proteins_rt'] = 'Accumulated number of proteins (1 / 2 unique peptides) vs RT';
	brain.graphs.name11['proteins_rt'] = 'proteins with 1 unique peptide:';
	brain.graphs.name12['proteins_rt'] = 'proteins with 2 unique peptide:';
	brain.graphs.name2['proteins_rt'] = '<br/>minutes: ';
	brain.graphs.name3['proteins_rt'] = '<br/>proteins (accumulated): ';
	brain.graphs.title_x['proteins_rt'] = 'retention time (min)';
	brain.graphs.title_y['proteins_rt'] = 'proteins';
	brain.graphs.type['proteins_rt'] = 'area';
	brain.graphs.tick_x['proteins_rt'] = 20;
	brain.graphs.funct['proteins_rt'] = label;
	brain.graphs.graph['proteins_rt'] = function()
		{
		// a matrix of RT and proteins, let's convert it in an accumulation curve
		if (brain.exponencial_conversion_done == 0)
			{
			for (var i=0; i<brain.graphs.protein_table.RT_proteins_with_1_unique_peptides.length; i++)
				{
				if (typeof brain.graphs.protein_table.RT_proteins_with_1_unique_peptides[i] == 'undefined')
					{
					brain.graphs.protein_table.RT_proteins_with_1_unique_peptides[i] = 0;
					}
				}
			for (var i=0; i<brain.graphs.protein_table.RT_proteins_with_2_unique_peptides.length; i++)
				{
				if (typeof brain.graphs.protein_table.RT_proteins_with_2_unique_peptides[i] == 'undefined')
					{
					brain.graphs.protein_table.RT_proteins_with_2_unique_peptides[i] = 0;
					}
				}

			for (var i=1; i<brain.graphs.protein_table.RT_proteins_with_1_unique_peptides.length; i++)
				{
				brain.graphs.protein_table.RT_proteins_with_1_unique_peptides[i] += brain.graphs.protein_table.RT_proteins_with_1_unique_peptides[i-1];
				}
			for (var i=1; i<brain.graphs.protein_table.RT_proteins_with_2_unique_peptides.length; i++)
				{
				brain.graphs.protein_table.RT_proteins_with_2_unique_peptides[i] += brain.graphs.protein_table.RT_proteins_with_2_unique_peptides[i-1];
				}
			brain.exponencial_conversion_done = 1;
			}

		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.protein_table.RT_proteins_with_1_unique_peptides,
			brain.graphs.protein_table.RT_proteins_with_2_unique_peptides);
		};

	var label = function() {return this.series.name+'<br/>sequence: '+this.point.name+brain.graphs.name2[graph_type]+this.x+brain.graphs.name3[graph_type]+this.y;}

	brain.graphs.name1['pep_rt_comparison'] = 'Peptides found in both files aligned with retention time, showing orthogonality';
	brain.graphs.name2['pep_rt_comparison'] = '<br/>RT (min): ';
	brain.graphs.name3['pep_rt_comparison'] = '<br/>RT (min): ';
	brain.graphs.type['pep_rt_comparison'] = 'scatter';
	brain.graphs.tick_x['pep_rt_comparison'] = 200;
	brain.graphs.radius['pep_rt_comparison'] = 3;
	brain.graphs.funct['pep_rt_comparison'] = label;
	brain.graphs.graph['pep_rt_comparison'] = function()
		{

		brain.graphs.title_x['pep_rt_comparison'] = 'RT (min) '+brain.chosen_file1_for_graphing_name;
		brain.graphs.title_y['pep_rt_comparison'] = 'RT (min) '+brain.chosen_file2_for_graphing_name;

		if (brain.orthogonality_conversion_done == 0)
			{
			// a matrix of RT and peptides, crossing the 2 selected files
			var matrix_of_orthogonality_x = new Array();
			var matrix_of_orthogonality_y = new Array();
			var matrix_of_orthogonality_names = new Array();

			for (var i=0; i<brain.graphs.peptide_table.RT_peptides_for_files[brain.chosen_file1_for_graphing-1].length; i++) // each value of the array is a peptide, containing the value in sub_arrays for each file
				{
				if (typeof brain.graphs.peptide_table.RT_peptides_for_files[brain.chosen_file1_for_graphing-1][i] == 'number' 
				|| typeof brain.graphs.peptide_table.RT_peptides_for_files[brain.chosen_file2_for_graphing-1][i] == 'number')
//					{}
//					else
					{
//console.log(typeof brain.graphs.peptide_table.RT_peptides_for_files[brain.chosen_file1_for_graphing-1][i]
//+' - '+typeof brain.graphs.peptide_table.RT_peptides_for_files[brain.chosen_file2_for_graphing-1][i])
					matrix_of_orthogonality_x.push(brain.graphs.peptide_table.RT_peptides_for_files[brain.chosen_file1_for_graphing-1][i]);
					matrix_of_orthogonality_y.push(brain.graphs.peptide_table.RT_peptides_for_files[brain.chosen_file2_for_graphing-1][i]);
					matrix_of_orthogonality_names.push(brain.graphs.peptide_table.RT_peptides_for_files_name[i]);
					}
				}
			brain.orthogonality_conversion_done = 1;
			}

		brain.single_graph(
			null,
			graph_type,
			null,
			null,
			matrix_of_orthogonality_x,
			matrix_of_orthogonality_y,
			matrix_of_orthogonality_names);
		};

	}

events.prototype.internal_graphs_peptides_scatter = function(graph_type,graph_chosen,op_var) // 2013.05.25
	{
	// ------------------------------------------------------------
	// SCATTER GRAPHS

	var label = function() {return this.series.name+brain.graphs.name2[graph_type]+this.x+brain.graphs.name3[graph_type]+this.y
				+'<br/>'+this.point.a
				+'<br/>'+this.point.b;}

	brain.graphs.name1['iit_rt'] = 'Ion injection time (ms) vs RT';
	brain.graphs.name2['iit_rt'] = '<br/>minutes: ';
	brain.graphs.name3['iit_rt'] = '<br/>ion time (ms): ';
	brain.graphs.title_x['iit_rt'] = 'retention time (min)';
	brain.graphs.title_y['iit_rt'] = 'ion time (ms)';
	brain.graphs.type['iit_rt'] = 'scatter';
	brain.graphs.tick_x['iit_rt'] = 20;
	brain.graphs.radius['iit_rt'] = 3;
	brain.graphs.funct['iit_rt'] = label;
	brain.graphs.graph['iit_rt'] = function() {
		brain.single_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.protein_descriptions,
			brain.graphs.peptide_table.accessions,
			brain.graphs.peptide_table.RT,
			brain.graphs.peptide_table.ion_inject_time);};



	brain.graphs.name1['iit_rt_mod'] = 'Ion injection time (ms) (modified peptides) vs RT';
	brain.graphs.name2['iit_rt_mod'] = '<br/>minutes: ';
	brain.graphs.name3['iit_rt_mod'] = '<br/>ion time (ms): ';
	brain.graphs.title_x['iit_rt_mod'] = 'retention time (min)';
	brain.graphs.title_y['iit_rt_mod'] = 'ion time (ms)';
	brain.graphs.type['iit_rt_mod'] = 'scatter';
	brain.graphs.tick_x['iit_rt_mod'] = 20;
	brain.graphs.radius['iit_rt_mod'] = 3;
	brain.graphs.funct['iit_rt_mod'] = label;
	brain.graphs.graph['iit_rt_mod'] = function() {
		brain.single_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.protein_descriptions,
			brain.graphs.peptide_table.accessions,
			brain.graphs.peptide_table.RT,
			brain.graphs.peptide_table.ion_inject_time_mod);};


	brain.graphs.name1['delta_rt'] = 'Delta (ppm) vs RT';
	brain.graphs.name2['delta_rt'] = '<br/>minutes: ';
	brain.graphs.name3['delta_rt'] = '<br/>ppm: ';
	brain.graphs.title_x['delta_rt'] = 'retention time (min)';
	brain.graphs.title_y['delta_rt'] = 'ppm';
	brain.graphs.type['delta_rt'] = 'scatter';
	brain.graphs.tick_x['delta_rt'] = 20;
	brain.graphs.radius['delta_rt'] = 3;
	brain.graphs.funct['delta_rt'] = label;
	brain.graphs.graph['delta_rt'] = function() {
		brain.single_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.protein_descriptions,
			brain.graphs.peptide_table.accessions,
			brain.graphs.peptide_table.RT,
			brain.graphs.peptide_table.delta_mass);};

	brain.graphs.name1['delta_rt_mod'] = 'Delta (ppm) (modified peptides) vs RT';
	brain.graphs.name2['delta_rt_mod'] = '<br/>minutes: ';
	brain.graphs.name3['delta_rt_mod'] = '<br/>ppm: ';
	brain.graphs.title_x['delta_rt_mod'] = 'retention time (min)';
	brain.graphs.title_y['delta_rt_mod'] = 'ppm';
	brain.graphs.type['delta_rt_mod'] = 'scatter';
	brain.graphs.tick_x['delta_rt_mod'] = 20;
	brain.graphs.radius['delta_rt_mod'] = 3;
	brain.graphs.funct['delta_rt_mod'] = label;
	brain.graphs.graph['delta_rt_mod'] = function() {
		brain.single_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.protein_descriptions,
			brain.graphs.peptide_table.accessions,
			brain.graphs.peptide_table.RT,
			brain.graphs.peptide_table.delta_mass_mod);};


	brain.graphs.name1['score_rt'] = 'Score vs RT';
	brain.graphs.name2['score_rt'] = '<br/>minutes: ';
	brain.graphs.name3['score_rt'] = '<br/>score: ';
	brain.graphs.title_x['score_rt'] = 'retention time (min)';
	brain.graphs.title_y['score_rt'] = 'score';
	brain.graphs.type['score_rt'] = 'scatter';
	brain.graphs.tick_x['score_rt'] = 20;
	brain.graphs.radius['score_rt'] = 3;
	brain.graphs.funct['score_rt'] = label;
	brain.graphs.graph['score_rt'] = function() {
		brain.single_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.protein_descriptions,
			brain.graphs.peptide_table.accessions,
			brain.graphs.peptide_table.RT,
			brain.graphs.peptide_table.score);};

	brain.graphs.name1['score_rt_mod'] = 'Score (modified peptides) vs RT';
	brain.graphs.name2['score_rt_mod'] = '<br/>minutes: ';
	brain.graphs.name3['score_rt_mod'] = '<br/>score: ';
	brain.graphs.title_x['score_rt_mod'] = 'retention time (min)';
	brain.graphs.title_y['score_rt_mod'] = 'score';
	brain.graphs.type['score_rt_mod'] = 'scatter';
	brain.graphs.tick_x['score_rt_mod'] = 20;
	brain.graphs.radius['score_rt_mod'] = 3;
	brain.graphs.funct['score_rt_mod'] = label;
	brain.graphs.graph['score_rt_mod'] = function() {
		brain.single_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.protein_descriptions,
			brain.graphs.peptide_table.accessions,
			brain.graphs.peptide_table.RT,
			brain.graphs.peptide_table.score_mod);};


	brain.graphs.name1['iit_mass'] = 'Ion injection time (ms) vs m/z';
	brain.graphs.name2['iit_mass'] = '<br/>m/z: ';
	brain.graphs.name3['iit_mass'] = '<br/>ion time (ms): ';
	brain.graphs.title_x['iit_mass'] = 'mass (m/z)';
	brain.graphs.title_y['iit_mass'] = 'ion time (ms)';
	brain.graphs.type['iit_mass'] = 'scatter';
	brain.graphs.tick_x['iit_mass'] = 200;
	brain.graphs.radius['iit_mass'] = 3;
	brain.graphs.funct['iit_mass'] = label;
	brain.graphs.graph['iit_mass'] = function() {
		brain.single_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.protein_descriptions,
			brain.graphs.peptide_table.accessions,
			brain.graphs.peptide_table.MW,
			brain.graphs.peptide_table.ion_inject_time);};

	brain.graphs.name1['iit_mass_mod'] = 'Ion injection time (ms) (modified peptides) vs m/z';
	brain.graphs.name2['iit_mass_mod'] = '<br/>m/z: ';
	brain.graphs.name3['iit_mass_mod'] = '<br/>ion time (ms): ';
	brain.graphs.title_x['iit_mass_mod'] = 'mass (m/z)';
	brain.graphs.title_y['iit_mass_mod'] = 'ion time (ms)';
	brain.graphs.type['iit_mass_mod'] = 'scatter';
	brain.graphs.tick_x['iit_mass_mod'] = 200;
	brain.graphs.radius['iit_mass_mod'] = 3;
	brain.graphs.funct['iit_mass_mod'] = label;
	brain.graphs.graph['iit_mass_mod'] = function() {
		brain.single_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.protein_descriptions,
			brain.graphs.peptide_table.accessions,
			brain.graphs.peptide_table.MW,
			brain.graphs.peptide_table.ion_inject_time_mod);};


	brain.graphs.name1['score_mass'] = 'Score vs m/z';
	brain.graphs.name2['score_mass'] = '<br/>m/z: ';
	brain.graphs.name3['score_mass'] = '<br/>score: ';
	brain.graphs.title_x['score_mass'] = 'mass (m/z)';
	brain.graphs.title_y['score_mass'] = 'score';
	brain.graphs.type['score_mass'] = 'scatter';
	brain.graphs.tick_x['score_mass'] = 200;
	brain.graphs.radius['score_mass'] = 3;
	brain.graphs.funct['score_mass'] = label;
	brain.graphs.graph['score_mass'] = function() {
		brain.single_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.protein_descriptions,
			brain.graphs.peptide_table.accessions,
			brain.graphs.peptide_table.MW,
			brain.graphs.peptide_table.score);};

	brain.graphs.name1['score_mass_mod'] = 'Score (modified peptides) vs m/z';
	brain.graphs.name2['score_mass_mod'] = '<br/>m/z: ';
	brain.graphs.name3['score_mass_mod'] = '<br/>score: ';
	brain.graphs.title_x['score_mass_mod'] = 'mass (m/z)';
	brain.graphs.title_y['score_mass_mod'] = 'score';
	brain.graphs.type['score_mass_mod'] = 'scatter';
	brain.graphs.tick_x['score_mass_mod'] = 200;
	brain.graphs.radius['score_mass_mod'] = 3;
	brain.graphs.funct['score_mass_mod'] = label;
	brain.graphs.graph['score_mass_mod'] = function() {
		brain.single_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.protein_descriptions,
			brain.graphs.peptide_table.accessions,
			brain.graphs.peptide_table.MW,
			brain.graphs.peptide_table.score_mod);};


	brain.graphs.name1['delta_mass'] = 'Delta (ppm) vs m/z';
	brain.graphs.name2['delta_mass'] = '<br/>m/z: ';
	brain.graphs.name3['delta_mass'] = '<br/>ppm: ';
	brain.graphs.title_x['delta_mass'] = 'mass (m/z)';
	brain.graphs.title_y['delta_mass'] = 'ppm';
	brain.graphs.type['delta_mass'] = 'scatter';
	brain.graphs.tick_x['delta_mass'] = 200;
	brain.graphs.radius['delta_mass'] = 3;
	brain.graphs.funct['delta_mass'] = label;
	brain.graphs.graph['delta_mass'] = function() {
		brain.single_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.protein_descriptions,
			brain.graphs.peptide_table.accessions,
			brain.graphs.peptide_table.MW,
			brain.graphs.peptide_table.delta_mass);};

	brain.graphs.name1['delta_mass_mod'] = 'Delta (ppm) (modified peptides) vs m/z';
	brain.graphs.name2['delta_mass_mod'] = '<br/>m/z: ';
	brain.graphs.name3['delta_mass_mod'] = '<br/>ppm: ';
	brain.graphs.title_x['delta_mass_mod'] = 'mass (m/z)';
	brain.graphs.title_y['delta_mass_mod'] = 'ppm';
	brain.graphs.type['delta_mass_mod'] = 'scatter';
	brain.graphs.tick_x['delta_mass_mod'] = 200;
	brain.graphs.radius['delta_mass_mod'] = 3;
	brain.graphs.funct['delta_mass_mod'] = label;
	brain.graphs.graph['delta_mass_mod'] = function() {
		brain.single_graph(
			null,
			graph_type,
			brain.graphs.peptide_table.protein_descriptions,
			brain.graphs.peptide_table.accessions,
			brain.graphs.peptide_table.MW,
			brain.graphs.peptide_table.delta_mass_mod);
			};
	}

events.prototype.internal_graphs_proteins_comparisons = function(graph_type,graph_chosen,op_var) // 2013.05.25
	{
	// PROTEINS
	// ------------------------------------------------------------
	// COLUMN GRAPHS

	var label = function() {return this.series.name+brain.graphs.name2[graph_type]+this.point.name+brain.graphs.name3[graph_type]+this.y;}


	// ------------------------------------------------------------
	// COLUMN GRAPHS


	brain.graphs.name1['prot_relative_dynamic_range'] = 'Protein abundances (log10) based on protein relative area percentages';
	brain.graphs.name2['prot_relative_dynamic_range'] = '<br/>protein: ';
	brain.graphs.name3['prot_relative_dynamic_range'] = '<br/>area relative percentage (per mile) (log10): ';
	brain.graphs.title_x['prot_relative_dynamic_range'] = 'proteins';
	brain.graphs.title_y['prot_relative_dynamic_range'] = 'log 10';
	brain.graphs.type['prot_relative_dynamic_range'] = 'column';
	brain.graphs.tick_x['prot_relative_dynamic_range'] = undefined;
	brain.graphs.min_x['prot_relative_dynamic_range'] = 0;
	if (op_var) {brain.graphs.max_x['prot_relative_dynamic_range'] = op_var;}
	brain.graphs.funct['prot_relative_dynamic_range'] = label;
	brain.graphs.graph['prot_relative_dynamic_range'] = function() {
		brain.pair_graph(
			graph_type,
			brain.graphs.protein_table.accession_relative_areas,
			graph_chosen,
			op_var);
			};

	brain.graphs.name1['prot_absolute_dynamic_range'] = 'Protein abundances (log10) based on protein absolute areas';
	brain.graphs.name2['prot_absolute_dynamic_range'] = '<br/>protein: ';
	brain.graphs.name3['prot_absolute_dynamic_range'] = '<br/>area (log10): ';
	brain.graphs.title_x['prot_absolute_dynamic_range'] = 'proteins';
	brain.graphs.title_y['prot_absolute_dynamic_range'] = 'log 10';
	brain.graphs.type['prot_absolute_dynamic_range'] = 'column';
	brain.graphs.tick_x['prot_absolute_dynamic_range'] = undefined;
	brain.graphs.min_x['prot_absolute_dynamic_range'] = 0;
	if (op_var) {brain.graphs.max_x['prot_relative_dynamic_range'] = op_var;}
	brain.graphs.funct['prot_absolute_dynamic_range'] = label;
	brain.graphs.graph['prot_absolute_dynamic_range'] = function() {
		brain.pair_graph(
			graph_type,
			brain.graphs.protein_table.accession_absolute_areas,
			graph_chosen,
			op_var);
			};

	brain.graphs.name1['prot_relative_dynamic_range_pie'] = 'Distribution of proteins based on protein relative area percentages';
	brain.graphs.name2['prot_relative_dynamic_range_pie'] = '<br/>protein: ';
	brain.graphs.name3['prot_relative_dynamic_range_pie'] = '<br/>area relative percentage (per mile): ';
	brain.graphs.title_x['prot_relative_dynamic_range_pie'] = 'proteins';
	brain.graphs.title_y['prot_relative_dynamic_range_pie'] = 'area relative percentage';
	brain.graphs.type['prot_relative_dynamic_range_pie'] = 'pie';
	brain.graphs.tick_x['prot_relative_dynamic_range_pie'] = undefined;
	brain.graphs.min_x['prot_relative_dynamic_range_pie'] = 0;
	brain.graphs.max_x['prot_relative_dynamic_range_pie'] = 10;
	brain.graphs.funct['prot_relative_dynamic_range_pie'] = label;
	brain.graphs.graph['prot_relative_dynamic_range_pie'] = function() {
		brain.pair_graph(
			graph_type,
			brain.graphs.protein_table.accession_relative_areas,
			graph_chosen);
			};

	brain.graphs.name1['prot_relative_dynamic_range_ratios'] = 'Distribution of values in log(2) scale';
	brain.graphs.name2['prot_relative_dynamic_range_ratios'] = '<br/>protein: ';
	brain.graphs.name3['prot_relative_dynamic_range_ratios'] = '<br/>value (log2): ';
	brain.graphs.title_x['prot_relative_dynamic_range_ratios'] = 'proteins';
	brain.graphs.title_y['prot_relative_dynamic_range_ratios'] = 'values (log2)';
	brain.graphs.type['prot_relative_dynamic_range_ratios'] = 'column';
	brain.graphs.tick_x['prot_relative_dynamic_range_ratios'] = undefined;
	brain.graphs.min_x['prot_relative_dynamic_range_ratios'] = 0;
	brain.graphs.funct['prot_relative_dynamic_range_ratios'] = label;
	brain.graphs.graph['prot_relative_dynamic_range_ratios'] = function() {
		brain.pair_graph(
			graph_type,
			brain.graphs.protein_table.accession_absolute_areas,
			graph_chosen);
			};

	brain.graphs.name1['prot_relative_comparison_area'] = 'Ratio (log2) of relative area percentages between samples';
	brain.graphs.name2['prot_relative_comparison_area'] = '<br/>protein: ';
	brain.graphs.name3['prot_relative_comparison_area'] = '<br/>area (log2): ';
	brain.graphs.title_x['prot_relative_comparison_area'] = 'proteins';
	brain.graphs.title_y['prot_relative_comparison_area'] = 'log 2';
	brain.graphs.type['prot_relative_comparison_area'] = 'column';
	brain.graphs.tick_x['prot_relative_comparison_area'] = undefined;
	brain.graphs.funct['prot_relative_comparison_area'] = label;
	brain.graphs.graph['prot_relative_comparison_area'] = function() {
		brain.pair_graph(
			graph_type,
			brain.graphs.protein_table.accession_relative_areas,
			graph_chosen);
			};

	brain.graphs.name1['prot_absolute_comparison_area'] = 'Ratio (log2) of protein absolute areas between samples';
	brain.graphs.name2['prot_absolute_comparison_area'] = '<br/>protein: ';
	brain.graphs.name3['prot_absolute_comparison_area'] = '<br/>area (log2): ';
	brain.graphs.title_x['prot_absolute_comparison_area'] = 'proteins';
	brain.graphs.title_y['prot_absolute_comparison_area'] = 'log 2';
	brain.graphs.type['prot_absolute_comparison_area'] = 'column';
	brain.graphs.tick_x['prot_absolute_comparison_area'] = undefined;
	brain.graphs.funct['prot_absolute_comparison_area'] = label;
	brain.graphs.graph['prot_absolute_comparison_area'] = function() {
		brain.pair_graph(
			graph_type,
			brain.graphs.protein_table.accession_absolute_areas,
			graph_chosen);
			};



	brain.graphs.name1['prot_absolute_comparison_score'] = 'Ratio (log2) of scores between samples';
	brain.graphs.name2['prot_absolute_comparison_score'] = '<br/>protein: ';
	brain.graphs.name3['prot_absolute_comparison_score'] = '<br/>score (log2): ';
	brain.graphs.title_x['prot_absolute_comparison_score'] = 'proteins';
	brain.graphs.title_y['prot_absolute_comparison_score'] = 'log 2';
	brain.graphs.type['prot_absolute_comparison_score'] = 'column';
	brain.graphs.tick_x['prot_absolute_comparison_score'] = undefined;
	brain.graphs.funct['prot_absolute_comparison_score'] = label;
	brain.graphs.graph['prot_absolute_comparison_score'] = function() {
		brain.pair_graph(
			graph_type,
			brain.graphs.protein_table.accession_scores,
			graph_chosen);
			};



	brain.graphs.name1['prot_absolute_comparison_peptides'] = 'Differences of number of peptides between samples';
	brain.graphs.name2['prot_absolute_comparison_peptides'] = '<br/>protein: ';
	brain.graphs.name3['prot_absolute_comparison_peptides'] = '<br/>number of peptides: ';
	brain.graphs.title_x['prot_absolute_comparison_peptides'] = 'proteins';
	brain.graphs.title_y['prot_absolute_comparison_peptides'] = 'number of peptides';
	brain.graphs.type['prot_absolute_comparison_peptides'] = 'column';
	brain.graphs.tick_x['prot_absolute_comparison_peptides'] = undefined;
	brain.graphs.funct['prot_absolute_comparison_peptides'] = label;
	brain.graphs.graph['prot_absolute_comparison_peptides'] = function() {
		brain.pair_graph(
			graph_type,
			brain.graphs.protein_table.accession_peptides,
			graph_chosen);
			};
	}

events.prototype.internal_graphs_proteins_global_comparisons = function(graph_type,graph_chosen,op_var) // 2013.05.25
	{
	// ------------------------------------------------------------
	// LINE GRAPHS

	var label = function() {return this.point.name+brain.graphs.name3[graph_type]+this.y;}

	brain.graphs.name1['prot_relative_files_areas'] = 'Ratio (log2) of relative area percentages between all samples';
	brain.graphs.name2['prot_relative_files_areas'] = '<br/>protein: ';
	brain.graphs.name3['prot_relative_files_areas'] = '<br/>area / area of first file (log2): ';
	brain.graphs.title_x['prot_relative_files_areas'] = 'files';
	brain.graphs.title_y['prot_relative_files_areas'] = 'area / area of first file (log2)';
	brain.graphs.type['prot_relative_files_areas'] = 'line';
	brain.graphs.tick_x['prot_relative_files_areas'] = undefined;
	brain.graphs.radius['prot_relative_files_areas'] = 3;
	brain.graphs.funct['prot_relative_files_areas'] = label;
	brain.graphs.graph['prot_relative_files_areas'] = function() {
		brain.files_graph(
			graph_type,
			brain.graphs.protein_table.accession_relative_areas
			);};
			
	brain.graphs.name1['prot_absolute_files_areas'] = 'Ratio (log2) of absolute area percentages between all samples';
	brain.graphs.name2['prot_absolute_files_areas'] = '<br/>protein: ';
	brain.graphs.name3['prot_absolute_files_areas'] = '<br/>area / area of first file (log2): ';
	brain.graphs.title_x['prot_absolute_files_areas'] = 'files';
	brain.graphs.title_y['prot_absolute_files_areas'] = 'area / area of first file (log2)';
	brain.graphs.type['prot_absolute_files_areas'] = 'line';
	brain.graphs.tick_x['prot_absolute_files_areas'] = undefined;
	brain.graphs.radius['prot_absolute_files_areas'] = 3;
	brain.graphs.funct['prot_absolute_files_areas'] = label;
	brain.graphs.graph['prot_absolute_files_areas'] = function() {
		brain.files_graph(
			graph_type,
			brain.graphs.protein_table.accession_absolute_areas
			);};

	brain.graphs.name1['prot_absolute_files_scores'] = 'Ratio (log2) of scores between all samples';
	brain.graphs.name2['prot_absolute_files_scores'] = '<br/>protein: ';
	brain.graphs.name3['prot_absolute_files_scores'] = '<br/>score / score of first file (log2): ';
	brain.graphs.title_x['prot_absolute_files_scores'] = 'files';
	brain.graphs.title_y['prot_absolute_files_scores'] = 'score / score of first file (log2)';
	brain.graphs.type['prot_absolute_files_scores'] = 'line';
	brain.graphs.tick_x['prot_absolute_files_scores'] = undefined;
	brain.graphs.radius['prot_absolute_files_scores'] = 3;
	brain.graphs.funct['prot_absolute_files_scores'] = label;
	brain.graphs.graph['prot_absolute_files_scores'] = function() {
		brain.files_graph(
			graph_type,
			brain.graphs.protein_table.accession_scores
			);};


	// ------------------------------------------------------------
	// OVERLAP BETWEEN FILES

	brain.graphs.name1['prot_files_lists'] = 'Overlap of all samples grouped by 2';
	brain.graphs.name2['prot_files_lists'] = '<br/>unique proteins: ';
	brain.graphs.name3['prot_files_lists'] = '<br/>number of proteins: ';
	brain.graphs.title_x['prot_files_lists'] = 'protocols combinations';
	brain.graphs.title_y['prot_files_lists'] = 'unique proteins';
	brain.graphs.type['prot_files_lists'] = 'column';
	brain.graphs.tick_x['prot_files_lists'] = undefined;
	brain.graphs.radius['prot_files_lists'] = 3;
	brain.graphs.funct['prot_files_lists'] = label;
	brain.graphs.graph['prot_files_lists'] = function()
		{

		if (brain.overlap_conversion_done == 0)
			{
			// create the matrix of combinations
			// I want to add the unique proteins that appear in one and not in the other, only grouped by 2 files

			// combinations[0][0] null
			// combinations[0][1] peptides uniques of 0 with respect 1
			// combinations[1][0] peptides uniques of 1 with respect 0
			// combinations[0][2]
			// combinations[2][0]
			// combinations[1][2]
			// combinations[2][1]
			// combinations[1][1] null
			// combinations[2][2] null

			var combinations = new Array();
			for (var i=0; i<=brain.files_analised; i++) // 0 is initialised also to avoid undefined
				{
				combinations[i] = new Array();
				for (var j=0; j<=brain.files_analised; j++)
					{
					combinations[i][j] = 0;
					}
				}

			var pool = document.getElementById(brain.layers.panel_proteins); // group of nodes
			var buffer = document.getElementById(brain.layers.buffer_proteins); // group of nodes for temporal buffer purposes

			var element1 = pool.firstElementChild;
			while (element1)
				{
				buffer.appendChild(element1);
				element1 = pool.firstElementChild; // the previous first element has been removed!
				}

			// move the useless nodes
			for (var i=0; i<brain.skip_nodes; i++)
				{
				pool.appendChild(buffer.firstElementChild);
				}

			var element1 = buffer.firstElementChild;
			var element2;
			var element2n;
			var discard; // variable to temporaly store if a protein is discarded from the selection

			// create an array of all files, 0 if this protein is not there, 1 if this protein is there *starting at 1 as before
			var found = new Array();
			var num = 0;
			new_element:
			while (element1)
				{
				found[num] = new Array();
				for (var i=1; i<=brain.files_analised; i++) found[num][i] = 0;

				element2 = element1.firstElementChild;
				while (element2)
					{
					if (element2.firstElementChild && element2.firstElementChild.className == 'prot_analysis')
						{
						element2n = element2.firstElementChild.firstElementChild; // first of the files that the protein has

						// set where this protein has been found
						while (element2n)
							{
							var i = element2n.className.slice(element2n.className.lastIndexOf('_')+1);
							found[num][i] = 1;
							element2n = element2n.nextElementSibling;
							}
						pool.appendChild(element1);

						element1 = buffer.firstElementChild;
						num++
						continue new_element;
						}
					element2 = element2.nextElementSibling;
					}
				element1 = buffer.firstElementChild;
				}

			for (var num=0; num<found.length; num++)
				{
				for (var i=1; i<=brain.files_analised; i++)
					{
					for (var j=1; j<=brain.files_analised; j++)
						{
						if (found[num][i] == 1 && found[num][j] == 0)
							{
							combinations[i][j]++;
							}
						}
					}
				}

			var overlap_names = new Array();
			var overlap_x = new Array();
			var overlap_y = new Array();
			for (var i=1; i<=brain.files_analised; i++)
				{
				overlap_names.push('--');
				overlap_x.push('--');
				overlap_y.push(0);
				for (var j=1; j<=brain.files_analised; j++)
					{
					if (j != i)
						{
						overlap_names.push('file 1: proteins of '+brain.files_analised_names[i-1]+
						'<br/>not detected in file 2: '+brain.files_analised_names[j-1]);
						overlap_x.push('file<br/>'+i+'-'+j);
						overlap_y.push(combinations[i][j]);
						}
					}
				}

			brain.overlap_conversion_done = 0
			}

		brain.single_graph(
			null,
			graph_type,
			null,
			null,
			null,
			overlap_y,
			overlap_names,
			overlap_x
			);
		};
	}

events.prototype.internal_graphs_proteins_MW_PI = function(graph_type,graph_chosen,op_var) // 2013.05.25
	{
	// ------------------------------------------------------------
	// COLUMN GRAPHS

	var label = function() {return this.series.name+brain.graphs.name2[graph_type]+this.x+brain.graphs.name3[graph_type]+this.y;}
	var label2 = function() {return this.series.name+brain.graphs.name2[graph_type]+this.x+' kDa'+brain.graphs.name3[graph_type]+this.y};
	var label3 = function() {return this.series.name+brain.graphs.name2[graph_type]+this.x+' kDa'+brain.graphs.name3[graph_type]+parseInt(this.y*10)/10};
	var label4 = function() {return this.series.name+brain.graphs.name2[graph_type]+this.x+brain.graphs.name3[graph_type]+parseInt(this.y*10)/10};

	brain.graphs.name1['MW_prot'] ='Number of proteins sorted by MW (1D SDSPAGE-like)';
	brain.graphs.name2['MW_prot'] = '<br/>MW: ';
	brain.graphs.name3['MW_prot'] = '<br/>number of proteins: ';
	brain.graphs.title_x['MW_prot'] = 'molecular weight (kDa)';
	brain.graphs.title_y['MW_prot'] = 'number of proteins';
	brain.graphs.type['MW_prot'] = 'column';
	brain.graphs.tick_x['MW_prot'] = 40;
	brain.graphs.funct['MW_prot'] = label3;
	brain.graphs.graph['MW_prot'] = function() {
		brain.single_graph(
			null,
			graph_type,
			null,
			null,
			null,
			brain.graphs.protein_table.MW_proteins
			);};


	brain.graphs.name1['MW_area'] = 'Area of proteins sorted by MW (1D SDSPAGE-like)';
	brain.graphs.name2['MW_area'] = '<br/>MW: ';
	brain.graphs.name3['MW_area'] = '<br/>sum of areas: ';
	brain.graphs.title_x['MW_area'] = 'molecular weight (kDa)';
	brain.graphs.title_y['MW_area'] = 'sum of areas';
	brain.graphs.type['MW_area'] = 'column';
	brain.graphs.tick_x['MW_area'] = 40;
	brain.graphs.funct['MW_area'] = label3;
	brain.graphs.graph['MW_area'] = function() {
		brain.single_graph(
			null,
			graph_type,
			null,
			null,
			null,
			brain.graphs.protein_table.MW_area
			);};


	brain.graphs.name1['MW_pep_unique'] = 'Number of peptides sorted by proteins MW';
	brain.graphs.name11['MW_pep_unique'] = 'peptides sorted by proteins MW';
	brain.graphs.name12['MW_pep_unique'] = 'unique peptides sorted by proteins MW';
	brain.graphs.name2['MW_pep_unique'] = '<br/>protein MW: ';
	brain.graphs.name3['MW_pep_unique'] = '<br/>peptides: ';
	brain.graphs.title_x['MW_pep_unique'] = 'molecular weight (kDa)';
	brain.graphs.title_y['MW_pep_unique'] = 'number of peptides detected for protein of that MW';
	brain.graphs.type['MW_pep_unique'] = 'column';
	brain.graphs.tick_x['MW_pep_unique'] = 40;
	brain.graphs.funct['MW_pep_unique'] = label2;
	brain.graphs.graph['MW_pep_unique'] = function() {
		brain.multiple_graph(
			null,
			graph_type,
			brain.graphs.protein_table.MW_peptides,
			brain.graphs.protein_table.MW_unique_peptides);};


	brain.graphs.name1['PI_prot'] = 'Number of proteins sorted by PI';
	brain.graphs.name2['PI_prot'] = '<br/>isoel. point: ';
	brain.graphs.name3['PI_prot'] = '<br/>number of proteins: ';
	brain.graphs.title_x['PI_prot'] = 'isoelectric point';
	brain.graphs.title_y['PI_prot'] = 'number of proteins';
	brain.graphs.type['PI_prot'] = 'column';
	brain.graphs.tick_x['PI_prot'] = 1;
	brain.graphs.min_x['PI_prot'] = 1;
	brain.graphs.max_x['PI_prot'] = 14;
	brain.graphs.funct['PI_prot'] = label;
	brain.graphs.graph['PI_prot'] = function() {
		brain.single_graph(
			10,
			graph_type,
			null,
			null,
			null,
			brain.graphs.protein_table.pI_proteins
			);};


	brain.graphs.name1['PI_area'] = 'Area of proteins sorted by PI';
	brain.graphs.name2['PI_area'] = '<br/>isoel. point: ';
	brain.graphs.name3['PI_area'] = '<br/>sum of areas: ';
	brain.graphs.title_x['PI_area'] = 'isoelectric point';
	brain.graphs.title_y['PI_area'] = 'sum of areas';
	brain.graphs.type['PI_area'] = 'column';
	brain.graphs.tick_x['PI_area'] = 1;
	brain.graphs.min_x['PI_area'] = 1;
	brain.graphs.max_x['PI_area'] = 14;
	brain.graphs.funct['PI_area'] = label4;
	brain.graphs.graph['PI_area'] = function() {
		brain.single_graph(
			10,
			graph_type,
			null,
			null,
			null,
			brain.graphs.protein_table.pI_area
			);};


	brain.graphs.name1['PI_pep_unique'] = 'Number of peptides sorted by proteins PI';
	brain.graphs.name11['PI_pep_unique'] = 'peptides sorted by proteins PI';
	brain.graphs.name12['PI_pep_unique'] = 'unique peptides sorted by proteins PI';
	brain.graphs.name2['PI_pep_unique'] = '<br/>isoel. point: ';
	brain.graphs.name3['PI_pep_unique'] = '<br/>peptides: ';
	brain.graphs.title_x['PI_pep_unique'] = 'isoelectric point';
	brain.graphs.title_y['PI_pep_unique'] = 'number of peptides detected for proteins of that pI';
	brain.graphs.type['PI_pep_unique'] = 'column';
	brain.graphs.tick_x['PI_pep_unique'] = 1;
	brain.graphs.min_x['PI_pep_unique'] = 1;
	brain.graphs.max_x['PI_pep_unique'] = 14;
	brain.graphs.funct['PI_pep_unique'] = label;
	brain.graphs.graph['PI_pep_unique'] = function() {
		brain.multiple_graph(
			10,
			graph_type,
			brain.graphs.protein_table.pI_peptides,
			brain.graphs.protein_table.pI_unique_peptides);};




	// ------------------------------------------------------------
	// SCATTER GRAPHS

	var label2 = function() {return this.series.name+brain.graphs.name2[graph_type]+this.x+' kDa'+brain.graphs.name3[graph_type]+this.y
				+'<br/>'+this.point.a
				+'<br/>'+this.point.b;}
	var label3 = function() {return this.series.name+brain.graphs.name2[graph_type]+this.x+' kDa'+brain.graphs.name3[graph_type]+parseInt(this.y*10)/10
				+'<br/>'+this.point.a
				+'<br/>'+this.point.b;}
	var label4 = function() {return this.series.name+brain.graphs.name2[graph_type]+this.x+brain.graphs.name3[graph_type]+parseInt(this.y*10)/10
				+'<br/>'+this.point.a
				+'<br/>'+this.point.b;}

	brain.graphs.name1['MW_PI'] = 'Proteins organised by MW and PI';
	brain.graphs.name2['MW_PI'] = '<br/>isoel. point: ';
	brain.graphs.name3['MW_PI'] = '<br/>MW: ';
	brain.graphs.title_x['MW_PI'] = 'isoelectric point';
	brain.graphs.title_y['MW_PI'] = 'molecular weight (kDa)';
	brain.graphs.type['MW_PI'] = 'scatter';
	brain.graphs.tick_x['MW_PI'] = 1;
	brain.graphs.tick_y['MW_PI'] = 40;
	brain.graphs.min_x['MW_PI'] = 1;
	brain.graphs.max_x['MW_PI'] = 14;
	brain.graphs.radius['MW_PI'] = 3;
	brain.graphs.funct['MW_PI'] = label3;
	brain.graphs.graph['MW_PI'] = function() {
		brain.single_graph(
			10,
			graph_type,
			brain.graphs.protein_table.description,
			brain.graphs.protein_table.accession,
			brain.graphs.protein_table.pI,
			brain.graphs.protein_table.MW);};




	brain.graphs.name1['MW_score'] = 'Proteins score sorted by MW';
	brain.graphs.name2['MW_score'] = '<br/>protein MW: ';
	brain.graphs.name3['MW_score'] = '<br/>score: ';
	brain.graphs.title_x['MW_score'] = 'molecular weight (kDa)';
	brain.graphs.title_y['MW_score'] = 'score';
	brain.graphs.type['MW_score'] = 'scatter';
	brain.graphs.tick_x['MW_score'] = 40;
	brain.graphs.radius['MW_score'] = 3;
	brain.graphs.funct['MW_score'] = label2;
	brain.graphs.graph['MW_score'] = function() {
		brain.single_graph(
			null,
			graph_type,
			brain.graphs.protein_table.description,
			brain.graphs.protein_table.accession,
			brain.graphs.protein_table.MW,
			brain.graphs.protein_table.score);};



	brain.graphs.name1['PI_score'] = 'Proteins score sorted by PI';
	brain.graphs.name2['PI_score'] = '<br/>isoel. point: ';
	brain.graphs.name3['PI_score'] = '<br/>score: ';
	brain.graphs.title_x['PI_score'] = 'isoelectric point';
	brain.graphs.title_y['PI_score'] = 'score';
	brain.graphs.type['PI_score'] = 'scatter';
	brain.graphs.tick_x['PI_score'] = 1;
	brain.graphs.min_x['PI_score'] = 1;
	brain.graphs.max_x['PI_score'] = 14;
	brain.graphs.radius['PI_score'] = 3;
	brain.graphs.funct['PI_score'] = label4;
	brain.graphs.graph['PI_score'] = function() {
		brain.single_graph(
			10,
			graph_type,
			brain.graphs.protein_table.description,
			brain.graphs.protein_table.accession,
			brain.graphs.protein_table.pI,
			brain.graphs.protein_table.score);
			};
	}

events.prototype.select_protein = function(ref) // 2013.01.03
	{
	brain.calculations = 0; // tables will be updated

	// also called by icons that trigger this function, to compensate
	if (ref.checked == true) {ref.checked = false;}
	else {ref.checked = true;}
	}

events.prototype.select_all_proteins = function(value) // 2013.04.25
	{
	var pool = document.getElementById(brain.layers.panel_proteins); // group of shown nodes
	var unselected = document.getElementById(brain.layers.unselected_proteins); // group of unshown nodes

	var element1;
	var element2;

	element1 = pool.firstElementChild;

	while (element1) // transversing all the elements
		{
		element2 = element1.firstElementChild;
		accession: while (element2)
			{
			if (element2.className == 'container_prot_chk')
				{
				element2.firstElementChild.firstElementChild.checked = value;
				break accession;
				}
			element2 = element2.nextElementSibling;
			}
		element1 = element1.nextElementSibling;
		}

	element1 = unselected.firstElementChild;

	while (element1) // transversing all the elements
		{
		element2 = element1.firstElementChild;
		accession: while (element2)
			{
			if (element2.className == 'container_prot_chk')
				{
				element2.firstElementChild.firstElementChild.checked = value;
				break accession;
				}
			element2 = element2.nextElementSibling;
			}
		element1 = element1.nextElementSibling;
		}
	}

events.prototype.start_drag = function(e,el) // 2013.05.04
	{
	events_data.dragging.x = e.clientX;
	events_data.dragging.y = e.clientY;

	var margin_left = parseInt(e.clientX-parseInt(window.getComputedStyle(el, null).getPropertyValue('left')));
	var margin_top = parseInt(e.clientY-parseInt(window.getComputedStyle(el, null).getPropertyValue('top')));


	if (margin_left < 50 || margin_left > 875 || margin_top < 50 || margin_top > 675) // to protect the zoom
		{
		document.onmousemove = function(event) {events.update_drag(event,el);} // if not using "function(event)..." and using directly the function "events.start..", event appears as not defined!
		}

	document.onmouseup = function()
		{
		document.onmousemove = null;
		document.onmouseup = null;
		return false;
		}

	return false; // to avoid that onmousemove is ineffective
	}

events.prototype.update_drag = function(e,el) // 2013.05.04
	{
	var existing_left = parseInt(window.getComputedStyle(el, null).getPropertyValue('left'));
	var existing_top = parseInt(window.getComputedStyle(el, null).getPropertyValue('top'));

	var left = parseInt(existing_left+(e.clientX-events_data.dragging.x))+'px';
	var top = parseInt(existing_top+(e.clientY-events_data.dragging.y))+'px';
	el.style.left = left;
	el.style.top = top;
	document.getElementById('close').style.left = left;
	document.getElementById('close').style.top = top;

	events_data.dragging.x = e.clientX;
	events_data.dragging.y = e.clientY;
	return false;
	}

events.prototype.dissapear = function(el) // 2013.05.04
	{
	el.style.display='none';
	el.previousSibling.style.display='none';
	return false;
	}

events.prototype.condensate = function(what) // 2013.10.12
	{
	brain.calculations = 0; // tables will be updated

	var pool = document.getElementById(brain.layers.panel_proteins); // group of nodes
	var buffer = document.getElementById(brain.layers.buffer_proteins); // group of nodes for temporal buffer purposes
	var unselected = document.getElementById(brain.layers.unselected_proteins); // group of nodes for temporal buffer purposes

	// put all nodes in a common place to start with all of them, the ones of the main place and the other of the unselected place
	var element1 = pool.firstElementChild;
	while (element1)
		{
		buffer.appendChild(element1);
		element1 = pool.firstElementChild; // the previous first element has been removed!
		}

	var element1 = unselected.firstElementChild;
	while (element1)
		{
		buffer.appendChild(element1);
		element1 = unselected.firstElementChild; // the previous first element has been removed!
		}

	// move the useless nodes
	for (var i=0; i<brain.skip_nodes; i++)
		{
		pool.appendChild(buffer.firstElementChild);
		}

	var element1 = buffer.firstElementChild;
	var element2;
	var element2n;
	var element2nn;

	var total_sum_of_areas = new Array();
	var total_sum_of_areas_percentage = new Array();
	var area_of_protein = new Array();
	var area_of_protein_percentage = new Array();
	var protein_found = 0;
	var protein_accession = 0;
	var node_seen = 0;
	var reference_node;
	var eliminated_nodes = 0;

	var protein_temporal;
	var protein_counter = 0;

	// evaluate all nodes to find out whether they are what we're looking for
	while (element1) // take one protein node
		{

		// do a first search to see only if this is a igg or a keratin. Why? Because if it is not, I will save the effort of looking and storing the variables
		// I assume it is faster this way
		element2 = element1.firstElementChild;
		finding_info:
		while (element2) // within the protein node, take all the divs inside
			{
			if (element2.firstElementChild && element2.firstElementChild.className == 'prot_desc')
				{
				node_seen++;
				if (what == 'immunoglobulins')
					{
					if (/mmunoglobulin/.test(element2.firstElementChild.textContent) ||
						/Ig /.test(element2.firstElementChild.textContent)
						)
						{
						eliminated_nodes++;
						protein_found = 1; // this variable will always refer to "what", since this function condensates only one node at a time!
						break finding_info;
						}
					}
				else if (what == 'keratins')
					{
					if (/eratin /.test(element2.firstElementChild.textContent) ||
						/eratin,/.test(element2.firstElementChild.textContent) ||
						/eratin-/.test(element2.firstElementChild.textContent)
						)
						{
						eliminated_nodes++;
						protein_found = 1;
						break finding_info;
						}
					}
				else if (what == 'complements')
					{
					if (/omplemen/.test(element2.firstElementChild.textContent)
						)
						{
						eliminated_nodes++;
						protein_found = 1;
						break finding_info;
						}
					}
				}
			element2 = element2.nextElementSibling;
			}

		// if we have found at least 2 proteins of the same kind, search again, and if the node is a igg or keratin, take all the data
		if (protein_found == 1)
			{
			element2 = element1.firstElementChild;
			finding_info:
			while (element2) // within the protein node, take all the divs inside
				{

//				if (element2.firstElementChild && element2.firstElementChild.className == 'prot_desc')
//					{
//					node_seen++;
//					if (what == 'immunoglobulins')
//						{
//						if (/mmunoglobulin/.test(element2.firstElementChild.textContent) ||
//							/Ig /.test(element2.firstElementChild.textContent)
//							)
//							{
//							}
//						}
//					else if (what == 'keratins')
//						{
//						if (/eratin /.test(element2.firstElementChild.textContent) ||
//							/eratin,/.test(element2.firstElementChild.textContent) ||
//							/eratin-/.test(element2.firstElementChild.textContent)
//							)
//							{
//							}
//						}
//					}

				// store accession, here I have the structure of container....remarked or not
				if (element2.firstElementChild.firstElementChild && element2.firstElementChild.firstElementChild.className == 'prot_uniprot')
					{
					node_seen++;
					protein_accession = element2.firstElementChild.firstElementChild.textContent; // accession
					}

				// store num of analysis and for each analysis, the area found and the area percentage found
				if (element2.firstElementChild && element2.firstElementChild.className == 'prot_file_vars')
					{
					node_seen++;
					element2n = element2.firstElementChild; // first of the unknown files
					var num; // to store the num of the file
					while (element2n)
						{
						element2nn = element2n.firstElementChild; // first of the divs inside prot...vars
						finding_area:
						while (element2nn)
							{
							if (element2nn.className == 'prot_analysis_data')
								{
								num = parseInt(element2nn.firstElementChild.className.slice(4))-1; // extract the num of the analysis
								break finding_area;
								}
							element2nn = element2nn.nextElementSibling;
							}

						element2nn = element2n.firstElementChild; // first of the divs inside prot...vars
						finding_area:
						while (element2nn)
							{
							if (element2nn.className == 'prot_area')
								{
								if (!isNaN(parseFloat(element2nn.textContent))) area_of_protein[num] = parseFloat(element2nn.textContent);
								break finding_area;
								}
							element2nn = element2nn.nextElementSibling;
							}

						element2nn = element2n.firstElementChild; // first of the divs inside prot...vars
						finding_area:
						while (element2nn)
							{
							if (element2nn.className == 'prot_area_percentage')
								{
								// is a percentage, textContent is NaN, but parseFloat(textContent) is not NaN
								if (!isNaN(parseFloat(element2nn.textContent))) area_of_protein_percentage[num] = parseFloat(element2nn.textContent);
								break finding_area;
								}
							element2nn = element2nn.nextElementSibling;
							}

						element2n = element2n.nextElementSibling;
						}
					}

				if (node_seen == 3) // it is the node and we've finished here
					{
					node_seen = 0;
					break finding_info;
					}

				element2 = element2.nextElementSibling;
				}
			node_seen = 0;

			// calculate the sum of areas and percentages for the condensed node
			for (var i=0; i<area_of_protein.length; i++)
				{
				if (isNaN(total_sum_of_areas[i])) total_sum_of_areas[i] = 0;
				total_sum_of_areas[i] += area_of_protein[i];
				}
			for (var i=0; i<area_of_protein_percentage.length; i++)
				{
				if (isNaN(total_sum_of_areas_percentage[i])) total_sum_of_areas_percentage[i] = 0;
				total_sum_of_areas_percentage[i] += area_of_protein_percentage[i];
				}

			protein_found = 0;

			reference_node = element1; // store the last node as the skeleton for the generic future node
			element1.parentNode.removeChild(element1);

			// remove the protein from the array, not necessary to re-calc the areas since the total number hasn't changed
			var element_protein = 'acc'+protein_accession;
			element_protein = element_protein.replace(/\s/g,''); // remove white spaces
			protein_temporal = brain.proteins[element_protein]; // store the last one (at least I need one)
			delete brain.proteins[element_protein];
			}
		else
			{
			element2 = element1.firstElementChild;
			finding_info:
			while (element2) // within the protein node, take all the divs inside
				{
				if (element2.firstElementChild && element2.firstElementChild.className == 'prot_n')
					{
					element2.firstElementChild.textContent = protein_counter;
					protein_counter++;
					break finding_info;
					}
				}

			pool.appendChild(element1); // protein is not anything to condense, then add to the original pool
			}

		// reset the variables
		for (var i=0; i<area_of_protein.length; i++)
			{
			area_of_protein[i] = 0;
			area_of_protein_percentage[i] = 0;
			}

		element1 = buffer.firstElementChild;
		}


	// change the reference node with new values
	node_seen = 0;
	element2 = reference_node.firstElementChild;
	var text;
	if (what == 'immunoglobulins') text = 'GENERIC IMMUNOGLOBULIN';
	else if (what == 'keratins') text = 'GENERIC KERATIN';
	else if (what == 'complements') text = 'GENERIC COMPLEMENT';
	

	finding_info:
	while (element2) // within the protein node, take all the divs inside
		{

		if (element2.firstElementChild && element2.firstElementChild.className == 'prot_desc')
			{
			node_seen++;
			element2.firstElementChild.textContent = text;
			element2.firstElementChild.title = text;
			}

		// change the info in the proteins array (the one used for re-calculate graphs)
		if (element2.firstElementChild.firstElementChild && element2.firstElementChild.firstElementChild.className == 'prot_uniprot')
			{
			node_seen++;
			var element_protein = 'acc'+element2.firstElementChild.firstElementChild.textContent; // accession
			element_protein = element_protein.replace(/\s/g,''); // remove white spaces
			brain.proteins[element_protein] = protein_temporal;
			brain.proteins[element_protein].description = text;
			for (var f=0; f<total_sum_of_areas.length; f++) // add nodes for all files
				{
				if (!brain.proteins[element_protein].files[f]) brain.proteins[element_protein].files[f] = new Object();
				brain.proteins[element_protein].files[f].num_of_file = f;
				brain.proteins[element_protein].files[f].area = total_sum_of_areas[f].toExponential(2);
				brain.proteins[element_protein].files[f].area_percentage = Math.round(total_sum_of_areas_percentage[f]*100)/100;
				}
			}

		// put an analysis node for each file found
		if (element2.firstElementChild && element2.firstElementChild.className == 'prot_analysis')
			{
			node_seen++;
			var ref_prot = element2.firstElementChild.firstElementChild.cloneNode(); // store 'run_' of 'prot_analysis' before delete
			element2n = element2.firstElementChild.firstElementChild; // select 'run_' of 'prot_analysis'
			while (element2n) // remove all nodes
				{
				element2n.parentNode.removeChild(element2n)
				element2n = element2.firstElementChild.firstElementChild;
				}
			for (var i=0; i<total_sum_of_areas.length; i++) // add nodes for all files
				{
				// if there are no areas, then there's no problem in eliminating the nodes since the generic node will have no area after all
				// , this will be the same as if for that file there are no nodes at all.
				if (!isNaN(total_sum_of_areas[i]))
					{
					var new_clone = ref_prot.cloneNode(); // store first node
					new_clone.className = 'run_'+parseInt(i+1);
					new_clone.title = brain.files_analised_names[i];
					element2.firstElementChild.appendChild(new_clone);
					}
				}
			}

		if (element2.firstElementChild && element2.firstElementChild.className == 'prot_file_vars')
			{
			node_seen++;
			var ref_prot = element2.firstElementChild.cloneNode(); // store first node
			element2n = element2.firstElementChild; // store first node
			while (element2n) // remove all nodes
				{
				element2.removeChild(element2n)
				element2n = element2.firstElementChild; // store first node
				}

			for (var i=0; i<total_sum_of_areas.length; i++) // add nodes for all files
				{
				var found_subs = 0;
				var new_clone = ref_prot.cloneNode(); // store first node
				element2n = new_clone.firstElementChild; // first of the divs inside prot...vars
				finding_files:
				while (element2n)
					{

					// put an analysis node for each file found
					if (element2n.className == 'prot_analysis_plus' && i == 0)
						{
						// eliminate node if it has a node
						if (element2n.firstElementChild) element2n.removeChild(element2n.firstElementChild);
						// create a new "cross" node from scratch
						var a_node = document.createElement('a');
						a_node.onClick = 'events.view_other_files(this,this.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.firstElementChild.firstElementChild);return false';
						a_node.addEventListener('click', function()
							{
							events.view_other_files(this,this.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.firstElementChild.firstElementChild);
							return false;
							});
						var a_div1 = document.createElement('div');
						var a_div2 = document.createElement('div');
						var a_div3 = document.createElement('div');
						var a_div4 = document.createElement('div');
						a_div1.className = 'icon icon-plus';
						a_div2.className = 'icon-plus-circle';
						a_div3.className = 'icon-plus-line-1';
						a_div4.className = 'icon-plus-line-2';
						a_div1.appendChild(a_div2);
						a_div1.appendChild(a_div3);
						a_div1.appendChild(a_div4);
						a_node.appendChild(a_div1);
						element2n.appendChild(a_node);
						found_subs++;
						}
					else if (element2n.className == 'prot_analysis_data')
						{
						element2n.firstElementChild.className = 'run_'+parseInt(i+1);
						element2n.firstElementChild.title = brain.files_analised_names[i];
						found_subs++;
						}
					else if (element2n.className == 'prot_area')
						{
						element2n.textContent = total_sum_of_areas[i].toExponential(2);
						found_subs++;
						}
					else if (element2n.className == 'prot_area_percentage')
						{
						element2n.textContent = Math.round(total_sum_of_areas_percentage[i]*100)/100+' ‰';
						found_subs++;
						}
					if (found_subs == 4)
						{
						found_subs = 0;
						break finding_files;
						}
					element2n = element2n.nextElementSibling;
					}
				element2.appendChild(new_clone);
				}
			}

		if (node_seen == 4)
			{
			node_seen = 0;
			break finding_info;
			}

		element2 = element2.nextElementSibling;
		}

	pool.appendChild(reference_node);
	console.log('eliminated '+eliminated_nodes+' nodes');
	document.getElementById('number_or_proteins').textContent = protein_counter;
	brain.total_number_of_proteins = protein_counter;
	}

events.prototype.plasma_highlight = function() // 2013.06.04
	{
	var pool = document.getElementById(brain.layers.panel_proteins); // group of shown nodes
	var unselected = document.getElementById(brain.layers.unselected_proteins); // group of unshown nodes

	var element1;
	var element2;

	element1 = pool.firstElementChild;

	while (element1) // transversing all the elements
		{
		element2 = element1.firstElementChild;
		accession: while (element2)
			{
			if (element2.className == 'container_prot_uniprot_remarked' ||
				element2.className == 'container_prot_uniprot_remarked_low' ||
				element2.className == 'container_prot_uniprot_remarked_moderate' ||
				element2.className == 'container_prot_uniprot_remarked_moderate2' ||
				element2.className == 'container_prot_uniprot_remarked_high')
				{
				element2.className = 'container_prot_uniprot';
				break accession;
				}
			element2 = element2.nextElementSibling;
			}
		element1 = element1.nextElementSibling;
		}

	element1 = unselected.firstElementChild;

	while (element1) // transversing all the elements
		{
		element2 = element1.firstElementChild;
		accession: while (element2)
			{
			if (element2.className == 'container_prot_uniprot_remarked' ||
				element2.className == 'container_prot_uniprot_remarked_low' ||
				element2.className == 'container_prot_uniprot_remarked_moderate' ||
				element2.className == 'container_prot_uniprot_remarked_moderate2' ||
				element2.className == 'container_prot_uniprot_remarked_high')
				{
				element2.className = 'container_prot_uniprot';
				break accession;
				}
			element2 = element2.nextElementSibling;
			}
		element1 = element1.nextElementSibling;
		}
	}









