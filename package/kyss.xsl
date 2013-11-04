<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
xmlns:fo="http://www.w3.org/1999/XSL/Format" 
xmlns:xs="http://www.w3.org/2001/XMLSchema" 
xmlns:fn="http://www.w3.org/2005/xpath-functions" 
xmlns:xdt="http://www.w3.org/2005/xpath-datatypes"
xmlns:exslt="http://exslt.org/common"
exclude-result-prefixes="exslt"
>

<!--
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

-->

<!-- create an object, each @name will be a property, and each property an array of all the files -->
<!-- substituted for a javascript array, since it takes way too long with firefox
<xsl:key name="total_files" match="/proteins/protein/file/@name" use="." />
-->

<!-- create an object, each file_found will be a property, and each one of the different properties an array of all the files (I will chose the first one, I don't care which one) -->
<!-- substituted for a javascript array, since it takes way too long with firefox
<xsl:key name="total_peptide_files" match="/proteins/protein/peptides/peptide/file/file_found" use="." />
-->
<!--
			<xsl:for-each select="/proteins/protein/file[generate-id(@name)=generate-id(key('total_files',@name)[1])]">
				<span title="{file/@name}"><xsl:value-of select="position()"/>&#160;</span>
			</xsl:for-each>
-->

<xsl:param name="first_time"/>
<xsl:param name="extra"/>

<xsl:template match="/">
	<!-- first match only executed, so it finds only 1 time the /, it is executed only one time -->
	<xsl:apply-templates select="/proteins/protein"> <!-- so I only select the elements and the position() works well -->

		<xsl:with-param name="first_time" >
			<xsl:value-of select="$first_time" />
		</xsl:with-param>
		<xsl:with-param name="extra" >
			<xsl:value-of select="$extra" />
		</xsl:with-param>

	</xsl:apply-templates>
</xsl:template>


<xsl:template match="proteins/protein">

	<xsl:param name="first_time"/>
	<xsl:param name="extra"/>

	<xsl:if test="position()=1 and $first_time=0">

	<div id="graphs" style="display:none;"></div>
	<div id="close" style="display:none;" onClick="events.dissapear(this);return false;">&#160;</div>


<!--
	<div id="close" style="display:none;" onClick="javascript:function(){this.style.display='none';this.previousSibling.style.display='none';return false;}">&#160;</div>
-->

	<div id="panel_selecting_files_to_be_moved" style="display:none;">

		<div id="panel_graphs_peptides_and_LC" class="panel graphs peptides_and_LC">
			<div class="title">PEPTIDES AND CHROMATOGRAPHY CONTROL
				<div class="trigger">
					<span class="help_icon">&#160;</span>
					<div class="help_text">
						<div class="help_title">PEP-RT/MZ</div>
						<div class="help_desc">
Represents the number of peptides sorted by retention time or m/z, highlighting those that are unique or modified.
						</div>
						<div class="help_title">CHR-RT/MZ</div>
						<div class="help_desc">
Represents the number of peptides grouped by number of charges sorted by retention time or m/z.
						</div>
						<div class="help_title">MC-RT/MZ</div>
						<div class="help_desc">
Represents the number of peptides grouped by number of missed cleavages sorted by retention time or m/z.
						</div>
						<div class="help_title">MODS-RT/MZ</div>
						<div class="help_desc">
Represents the number of pepdies that have that modification sorted by retention time or m/z.
						</div>
						<div class="help_title">SCORE-RT/MZ</div>
						<div class="help_desc">
Represents the score of each peptide sorted by retention time or m/z.
						</div>
						<div class="help_title">PROT-RT</div>
						<div class="help_desc">
Represents the accumulated number of proteins by retention time, separated by proteins defined by one or two unique peptide.
						</div>
						<div class="help_title">ORTHOGONALITY</div>
						<div class="help_desc">
Select two list of proteins and depict the retention time of each peptide in both lists, to see the correlation between the two chromatographies
where peptides have been separated.
						</div>
						<div class="help_title">(black buttons)</div>
						<div class="help_desc">
First button refer to the number of all peptides.
						</div>
						<div class="help_title">(grey buttons)</div>
						<div class="help_desc">
Second button refer only to peptides that have a modification.
						</div>
						<div class="help_title">(yellow buttons)</div>
						<div class="help_desc">
Third button refer to all peptides, but depicting not the number of peptides but the peptides area.
						</div>
						<div class="help_title">(grey buttons)</div>
						<div class="help_desc">
Forth button refer to modified peptides, depicting peptides area.
						</div>
						<div class="help_title">WHAT HAPPENS WHEN ANALYSING MULTIPLE FILES?</div>
						<div class="help_desc">
Graphs will depict values of the FIRST LIST, unless it is not in that list, then values of the SECOND LIST, and so on.
						</div>
					</div>
				</div>
			</div>

			<div class="group text">
				<div class="button" onClick="events.view_graphs('peptides_rt')" title="number of peptides">&#160;</div>
				<div class="button" onClick="events.view_graphs('charge_rt')" title="number of peptides">&#160;</div>
				<div class="button" onClick="events.view_graphs('missed_rt')" title="number of peptides">&#160;</div>
				<div class="button" onClick="events.view_graphs('peptides_mods_rt')" title="number of peptides">&#160;</div>
				<div class="button" onClick="events.view_graphs('score_rt')" title="peptides">&#160;</div>
				<div class="button" onClick="events.view_graphs('proteins_rt')" title="all peptides">&#160;</div>
			</div>
			<div class="group text">
				<div class="no_button">&#160;</div>
				<div class="button mod" onClick="events.view_graphs('charge_rt_mod')" title="number of modified peptides">&#160;</div>
				<div class="button mod" onClick="events.view_graphs('missed_rt_mod')" title="number of modified peptides">&#160;</div>
				<div class="no_button">&#160;</div>
				<div class="button mod" onClick="events.view_graphs('score_rt_mod')" title="modified peptides">&#160;</div>
				<div class="no_button">&#160;</div>
			</div>
			<div class="group text">
				<div class="button mod2" onClick="events.view_graphs('peptides_area_rt')" title="area of peptides">&#160;</div>
				<div class="button mod2" onClick="events.view_graphs('charge_area_rt')" title="area of peptides">&#160;</div>
				<div class="button mod2" onClick="events.view_graphs('missed_area_rt')" title="area of peptides">&#160;</div>
				<div class="button mod2" onClick="events.view_graphs('peptides_mods_area_rt')" title="area of peptides">&#160;</div>
				<div class="no_button">&#160;</div>
				<div class="no_button">&#160;</div>
			</div>
			<div class="group text">
				<div class="no_button">&#160;</div>
				<div class="button mod" onClick="events.view_graphs('charge_area_rt_mod')" title="area of modified peptides">&#160;</div>
				<div class="button mod" onClick="events.view_graphs('missed_area_rt_mod')" title="area of modified peptides">&#160;</div>
				<div class="no_button">&#160;</div>
				<div class="no_button">&#160;</div>
				<div class="no_button">&#160;</div>
			</div>
			<div class="group text labels">
				<div class="text" title="All, unique and modified peptides versus retention time">PEP-RT</div>
				<div class="text" title="Peptides with determined number of charges versus retention time">CHR-RT</div>
				<div class="text" title="Peptides with determined missed cleavages versus retention time">MC-RT</div>
				<div class="text" title="Modified peptides versus retention time">MODS-RT</div>
				<div class="text" title="Peptides score versus retention time">SCORE-RT</div>
				<div class="text" title="Proteins defined by 1 and 2 unique peptides versus retention time">PROT-RT</div>
			</div>


			<div class="group text">
				<div class="button" onClick="events.view_graphs('peptides_mass')" title="number of peptides">&#160;</div>
				<div class="button" onClick="events.view_graphs('charge_mass')" title="number of peptides">&#160;</div>
				<div class="button" onClick="events.view_graphs('missed_mass')" title="number of peptides">&#160;</div>
				<div class="button" onClick="events.view_graphs('peptides_mods_mass')" title="number of peptides">&#160;</div>
				<div class="button" onClick="events.view_graphs('score_mass')" title="peptides">&#160;</div>
			</div>
			<div class="group text">
				<div class="no_button">&#160;</div>
				<div class="button mod" onClick="events.view_graphs('charge_mass_mod')" title="number of modified peptides">&#160;</div>
				<div class="button mod" onClick="events.view_graphs('missed_mass_mod')" title="number of modified peptides">&#160;</div>
				<div class="no_button">&#160;</div>
				<div class="button mod" onClick="events.view_graphs('score_mass_mod')" title="modified peptides">&#160;</div>
			</div>
			<div class="group text">
				<div class="button mod2" onClick="events.view_graphs('peptides_area_mass')" title="area of peptides">&#160;</div>
				<div class="button mod2" onClick="events.view_graphs('charge_area_mass')" title="area of peptides">&#160;</div>
				<div class="button mod2" onClick="events.view_graphs('missed_area_mass')" title="area of peptides">&#160;</div>
				<div class="button mod2" onClick="events.view_graphs('peptides_mods_area_mass')" title="area of peptides">&#160;</div>
				<div class="no_button">&#160;</div>
			</div>
			<div class="group text">
				<div class="no_button">&#160;</div>
				<div class="button mod" onClick="events.view_graphs('charge_area_mass_mod')" title="area of modified peptides">&#160;</div>
				<div class="button mod" onClick="events.view_graphs('missed_area_mass_mod')" title="area of modified peptides">&#160;</div>
				<div class="no_button">&#160;</div>
				<div class="no_button">&#160;</div>
			</div>
			<div class="group text labels">
				<div class="text" title="All, unique and modified peptides versus mass per charge">PEP-M/Z</div>
				<div class="text" title="Peptides with determined number of charges versus mass per charge">CHR-M/Z</div>
				<div class="text" title="Peptides with determined missed cleavages versus mass per charge">MC-M/Z</div>
				<div class="text" title="Modified peptides versus mass per charge">MODS-M/Z</div>
				<div class="text" title="Peptides score versus mass per charge">SCORE-M/Z</div>
			</div>

			<xsl:if test="count(/proteins/number_of_protein_analysis/file) &gt; 1">
				<xsl:for-each select="/proteins/number_of_protein_analysis/file">
					<div id="checkboxes_{position()}" class="group text">
						<div class="container_graphs_chk"><div class="prot_graphs_chk"><input type="checkbox" id="orthogonality_{position()}" title="{.}" /></div></div>
						<div class="header"><div title="{.}" class="run_{position()}">&#160;</div></div>
					</div>
				</xsl:for-each>
			</xsl:if>

			<div class="group text">
				<xsl:if test="count(/proteins/number_of_protein_analysis/file) &gt; 1">
					<div onClick="events.view_graphs('pep_rt_comparison','orthogonality_')" title="Comparing peptides retention times between files" class="button">&#160;</div>
				</xsl:if>
			</div>

			<div class="group text labels">
				<xsl:if test="count(/proteins/number_of_protein_analysis/file) &gt; 1">
					<div class="text" title="Comparing protein scores between files">ORTHOGONALITY</div>
				</xsl:if>
			</div>
		</div>

		<div id="panel_graphs_MS" class="panel graphs MS">
			<div class="title">MS CONTROL GRAPHS
				<div class="trigger">
					<span class="help_icon">&#160;</span>
					<div class="help_text">
						<div class="help_title">Inj.time-RT/MZ</div>
						<div class="help_desc">
Represents the injection time for each precursor in the MSn fragmentation, sorted by retention time or m/z.
						</div>
						<div class="help_title">Delta-RT/MZ</div>
						<div class="help_desc">
Represents the delta mass of each precursor sorted by retention time or m/z.
						</div>
						<div class="help_title">(black buttons)</div>
						<div class="help_desc">
First button refer to all peptides.
						</div>
						<div class="help_title">(grey buttons)</div>
						<div class="help_desc">
Second button refer only to peptides that have a modification.
						</div>
						<div class="help_title">WHAT HAPPENS WHEN ANALYSING MULTIPLE FILES?</div>
						<div class="help_desc">
Graphs will depict values of the FIRST LIST, unless it is not in that list, then values of the SECOND LIST, and so on.
						</div>
					</div>
				</div>
			</div>

			<div class="group text">
				<div class="button" onClick="events.view_graphs('iit_rt')" title="peptides">&#160;</div>
				<div class="button" onClick="events.view_graphs('delta_rt')" title="peptides">&#160;</div>
				<div class="button" onClick="events.view_graphs('iit_mass')" title="peptides">&#160;</div>
				<div class="button" onClick="events.view_graphs('delta_mass')" title="peptides">&#160;</div>
			</div>
			<div class="group text">
				<div class="button mod" onClick="events.view_graphs('iit_rt_mod')" title="modified peptides">&#160;</div>
				<div class="button mod" onClick="events.view_graphs('delta_rt_mod')" title="modified peptides">&#160;</div>
				<div class="button mod" onClick="events.view_graphs('iit_mass_mod')" title="modified peptides">&#160;</div>
				<div class="button mod" onClick="events.view_graphs('delta_mass_mod')" title="modified peptides">&#160;</div>
			</div>
			<div class="group text labels">
				<div class="text" title="Peptides injection time versus retention time">Inj.time-RT</div>
				<div class="text" title="Peptides delta mass versus retention time">Delta-RT</div>
				<div class="text" title="Peptides injection time versus mass per charge">Inj.time-M/Z</div>
				<div class="text" title="Peptides delta mass versus mass per charge">Delta-M/Z</div>
			</div>
		</div>

		<div id="panel_graphs_proteins" class="panel graphs proteins">
			<div class="title">PROTEIN CONTROL
				<div class="trigger">
					<span class="help_icon">&#160;</span>
					<div class="help_text">
						<div class="help_title">PI-MW</div>
						<div class="help_desc">
Represents the isoelectric point of each identified protein versus its molecular weight.
						</div>
						<div class="help_title">PROT-MW/PI</div>
						<div class="help_desc">
Represents all identified proteins sorted by molecular weight or isoelectric point.
						</div>
						<div class="help_title">AREA-MW/PI</div>
						<div class="help_desc">
Represents the areas of all identified proteins sorted by molecular weight or isoelectric point.
						</div>
						<div class="help_title">PEP-MW/PI</div>
						<div class="help_desc">
Represents the number of peptides of all identified proteins sorted by molecular weight or isoelectric point.
						</div>
						<div class="help_title">SCORE-MW/PI</div>
						<div class="help_desc">
Represents the score of all identified proteins sorted by molecular weight or isoelectric point.
						</div>
					</div>
				</div>
			</div>

			<div class="group text">
				<div class="button" onClick="events.view_graphs('MW_PI')" title="Molecular Weight versus Isoelectric Point">&#160;</div>
				<div class="button" onClick="events.view_graphs('MW_prot')" title="Molecular Weight versus number of proteins">&#160;</div>
				<div class="button" onClick="events.view_graphs('MW_area')" title="Molecular Weight versus area of proteins">&#160;</div>
				<div class="button" onClick="events.view_graphs('MW_pep_unique')" title="Molecular Weight versus unique peptides">&#160;</div>
				<div class="button" onClick="events.view_graphs('MW_score')" title="Molecular Weight versus score">&#160;</div>
			</div>
			<div class="group text labels">
				<div class="text" title="Molecular Weight versus Isoelectric Point">PI-MW</div>
				<div class="text" title="Molecular Weight versus number of proteins">PROT-MW</div>
				<div class="text" title="Molecular Weight versus area of proteins">AREA-MW</div>
				<div class="text" title="Molecular Weight versus unique peptides">PEP-MW</div>
				<div class="text" title="Molecular Weight versus score">SCORE-MW</div>
			</div>
			<div class="group text">
				<div class="no_button">&#160;</div>
				<div class="button" onClick="events.view_graphs('PI_prot')" title="Isoelectric Point versus number of proteins">&#160;</div>
				<div class="button" onClick="events.view_graphs('PI_area')" title="Isoelectric Point versus area of proteins">&#160;</div>
				<div class="button" onClick="events.view_graphs('PI_pep_unique')" title="Isoelectric Point versus unique peptides">&#160;</div>
				<div class="button" onClick="events.view_graphs('PI_score')" title="Molecular Weight versus Isoelectric Point">&#160;</div>
			</div>
			<div class="group text labels">
				<div class="text" title="Isoelectric Point versus number of proteins">&#160;</div>
				<div class="text" title="Isoelectric Point versus number of proteins">PROT-PI</div>
				<div class="text" title="Isoelectric Point versus area of proteins">AREA-PI</div>
				<div class="text" title="Isoelectric Point versus unique peptides">PEP-PI</div>
				<div class="text" title="Isoelectric Point versus score">SCORE-PI</div>
			</div>

		</div>

		<div id="panel_graphs_select_files" class="panel graphs select_files">
			<div class="title">PROTEIN LISTS ANALYSIS
				<div class="trigger">
					<span class="help_icon">&#160;</span>
					<div class="help_text">
						<div class="help_title">SELECTED</div>
						<div class="help_desc">
Show those proteins that appear in the selected list.
						</div>
						<div class="help_title">NEUTRAL</div>
						<div class="help_desc">
Show proteins regardless whether those proteins that appear in the selected lis.
						</div>
						<div class="help_title">UNSELECTED</div>
						<div class="help_desc">
Show those proteins that do not appear in the selected list.
						</div>
					</div>
				</div>
			</div>

			<xsl:if test="count(/proteins/number_of_protein_analysis/file) &gt; 1">
			<div class="group text">
				<div class="text">selected</div>
				<div class="text">neutral</div>
				<div class="text">unselected</div>
			</div>
			<xsl:for-each select="/proteins/number_of_protein_analysis/file">
				<div class="group">
					<div id="control_panel_container_and_{position()}" title="file: {.}" onClick="events.select_group(this,{count(/proteins/number_of_protein_analysis/file)});return false" class="button"></div>
					<div id="control_panel_container_or_{position()}" title="file: {.}" onClick="events.select_group(this,{count(/proteins/number_of_protein_analysis/file)});return false" class="button selected"></div>
					<div id="control_panel_container_not_{position()}" title="file: {.}" onClick="events.select_group(this,{count(/proteins/number_of_protein_analysis/file)});return false" class="button"></div>
					<div class="header"><div title="{.}" class="run_{position()}">&#160;</div></div>
				</div>
			</xsl:for-each>
			</xsl:if>
		</div>

		<div id="panel_graphs_proteins_comparison" class="panel graphs proteins_comparison">
			<div class="title">PROTEIN LISTS COMPARISON
				<div class="trigger">
					<span class="help_icon">&#160;</span>
					<div class="help_text">
						<div class="help_title">PA(COL)</div>
						<div class="help_desc">
(SELECT 1 or 2 LISTS)
						</div>
						<div class="help_title">&#160;</div>
						<div class="help_desc">
Relation of relative abundances of each protein in a logarithmic scale. 
Values are expressed as the log(10) of the relative abundance, transformed by adding 1 to avoid negative values. 
If 2 files are selected, the two protein abundances are compared. 
						</div>
						<div class="help_title">&#160;</div>
						<div class="help_desc">
By clicking again to the same button, the two graphs are interchanged and sorted with the top graph as reference.
						</div>
						<div class="help_title">PA(PIE)</div>
						<div class="help_desc">
(SELECT 1 LIST)
						</div>
						<div class="help_title">&#160;</div>
						<div class="help_desc">
Relation of relative abundances of the top-10 most abundant proteins in a pie chart. 
						</div>
						<div class="help_title">&#160;</div>
						<div class="help_desc">
By clicking again to the same button, the two graphs are interchanged and sorted with the top graph as reference.
						</div>
						<div class="help_title">RATIOS</div>
						<div class="help_desc">
(SELECT 1 LIST)
						</div>
						<div class="help_title">&#160;</div>
						<div class="help_desc">
Graphic exclusive to visualise ratios inserted in the area column.
Values are expressed as the log(2) of the ratios, not transforming the values. 
						</div>

						<div class="help_title">COMP-AREA</div>
						<div class="help_desc">
Represents differences between the 2 lists selected in terms of areas. 
Expressed as log(2). 
Only those (log2) values that differ more than 0.5 units are depicted (only differences higher than 1.41 folds).
						</div>
						<div class="help_title">COMP-SCORE</div>
						<div class="help_desc">
(SELECT 2 LISTS)
						</div>
						<div class="help_title">&#160;</div>
						<div class="help_desc">
Represents differences between the 2 lists selected in terms of score. 
See description in COMP-AREA
						</div>
						<div class="help_title">COMP-PEP</div>
						<div class="help_desc">
(SELECT 2 LISTS)
						</div>
						<div class="help_title">&#160;</div>
						<div class="help_desc">
Represents differences between the 2 lists selected in terms of number of peptides. 
See description in COMP-AREA
						</div>
						<div class="help_title">FILES(AREA)</div>
						<div class="help_desc">
Comparison of all proteins in terms of areas, taking as the reference the proteins identified in list 1.
Values of all lists are represented as a quotient with the value of list 1.
Thus, list 1 by definition will always have a value of 1.
Values are expressed as log2(value).
						</div>
						<div class="help_title">FILES(SCORE)</div>
						<div class="help_desc">
Comparison of all proteins in terms of scores, taking as the reference the proteins identified in list 1.
See description of FILES(AREA).
						</div>
						<div class="help_title">FILES OVERLAP</div>
						<div class="help_desc">
Comparison of all lists versus each one of the other lists, in terms of identified unique proteins.
						</div>

						<div class="help_title">(1st button)</div>
						<div class="help_desc">
First button depicts relative abundances of all proteins.
						</div>
						<div class="help_title">(2nd button)</div>
						<div class="help_desc">
Second button depicts absolute areas of all proteins.
						</div>
						<div class="help_title">(3rd button)</div>
						<div class="help_desc">
Third button depicts relative abundances of top-50 proteins.
						</div>
						<div class="help_title">(4th button)</div>
						<div class="help_desc">
Forth button depicts absolute areas of top-50 proteins.
						</div>
					</div>
				</div>
			</div>

			<xsl:for-each select="/proteins/number_of_protein_analysis/file">
				<div id="checkboxes_{position()}" class="group text">
					<div class="container_graphs_chk"><div class="prot_graphs_chk"><input type="checkbox" id="dynamic_check_{position()}" title="{.}" /></div></div>
					<div class="container_graphs_chk"><div class="prot_graphs_chk"><input type="checkbox" id="dynamic_pie_check_{position()}" title="{.}" /></div></div>
					<div class="container_graphs_chk"><div class="prot_graphs_chk"><input type="checkbox" id="dynamic_ratios_check_{position()}" title="{.}" /></div></div>
					<div class="header"><div title="{.}" class="run_{position()}">&#160;</div></div>
				</div>
			</xsl:for-each>

			<div class="group text">
				<div onClick="events.view_graphs('prot_relative_dynamic_range','dynamic_check_')" title="Protein abundances based on relative areas (proteins)" class="button">&#160;</div>
				<div onClick="events.view_graphs('prot_relative_dynamic_range_pie','dynamic_pie_check_')" title="Protein abundances based on relative areas (proteins)" class="button">&#160;</div>
				<div onClick="events.view_graphs('prot_relative_dynamic_range_ratios','dynamic_ratios_check_')" title="Depict areas column as if these are ratios" class="button">&#160;</div>
			<xsl:if test="count(/proteins/number_of_protein_analysis/file) &gt; 1">
			</xsl:if>
			</div>

			<div class="group text">
				<div onClick="events.view_graphs('prot_absolute_dynamic_range','dynamic_check_')" title="Protein abundances based on absolute areas (proteins)" class="button">&#160;</div>
			<xsl:if test="count(/proteins/number_of_protein_analysis/file) &gt; 1">
			</xsl:if>
			</div>

			<div class="group text">&#160;
			</div>

			<div class="group text">
				<div onClick="events.view_graphs('prot_relative_dynamic_range','dynamic_check_',50)" title="TOP-50 only - relative areas" class="button">&#160;</div>
			</div>

			<div class="group text">
				<div onClick="events.view_graphs('prot_relative_dynamic_range','dynamic_check_',50)" title="TOP-50 only - absolute areas" class="button">&#160;</div>
			</div>

			<div class="group text labels">
				<div class="text" title="Protein abundances based on protein areas">PA(COL)</div>
				<div class="text" title="Protein abundances based on protein areas">PA(PIE)</div>
				<div class="text" title="Depict areas column as if these are ratios">RATIOS</div>
			<xsl:if test="count(/proteins/number_of_protein_analysis/file) &gt; 1">
			</xsl:if>
			</div>

			<xsl:if test="count(/proteins/number_of_protein_analysis/file) &gt; 1">
			<xsl:for-each select="/proteins/number_of_protein_analysis/file">
				<div id="checkboxes_{position()}" class="group text">
					<div class="container_graphs_chk"><div class="prot_graphs_chk"><input type="checkbox" id="comparison_check_{position()}" title="{.}" /></div></div>
					<div class="container_graphs_chk"><div class="prot_graphs_chk"><input type="checkbox" id="comparison_score_check_{position()}" title="{.}" /></div></div>
					<div class="container_graphs_chk"><div class="prot_graphs_chk"><input type="checkbox" id="comparison_peptides_check_{position()}" title="{.}" /></div></div>
					<div class="header"><div title="{.}" class="run_{position()}">&#160;</div></div>
				</div>
			</xsl:for-each>

			<div class="group text">
				<div onClick="events.view_graphs('prot_relative_comparison_area','comparison_check_')" title="Comparing protein relative areas between files" class="button">&#160;</div>
				<div onClick="events.view_graphs('prot_absolute_comparison_score','comparison_score_check_')" title="Comparing protein scores between files" class="button">&#160;</div>
				<div onClick="events.view_graphs('prot_absolute_comparison_peptides','comparison_peptides_check_')" title="Comparing protein identified peptides between files" class="button">&#160;</div>
			</div>

			<div class="group text">
				<div onClick="events.view_graphs('prot_absolute_comparison_area','comparison_check_')" title="Comparing protein absolute areas between files" class="button">&#160;</div>
			</div>

			<div class="group text labels">
				<div class="text" title="Comparing protein areas between files">COMP-AREA</div>
				<div class="text" title="Comparing protein scores between files">COMP-SCORE</div>
				<div class="text" title="Comparing protein identified peptides between files">COMP-PEP</div>
			</div>

			<div class="group text">
				<div onClick="events.view_graphs('prot_relative_files_areas')" title="Comparison of protein relative areas between the different files" class="button">&#160;</div>
				<div onClick="events.view_graphs('prot_absolute_files_scores')" title="Comparison of protein scores between the different files" class="button">&#160;</div>
				<div onClick="events.view_graphs('prot_files_lists')" title="Comparison of protein lists between the different files" class="button">&#160;</div>
			</div>

			<div class="group text">
				<div onClick="events.view_graphs('prot_absolute_files_areas')" title="Comparison of protein absolute areas between the different files" class="button">&#160;</div>
			</div>

			<div class="group text labels">
				<div class="text" title="Comparison of protein areas between the different files">FILES(AREA)</div>
				<div class="text" title="Comparison of protein scores between the different files">FILES(SCORE)</div>
				<div class="text" title="Comparison of protein lists between the different files">FILES OVERLAP</div>
			</div>
			</xsl:if>

		</div>

		<div class="panel graphs plasma_analisys">
			<div class="title">BLOOD PLASMA ANALYSIS
				<div class="trigger">
					<span class="help_icon">&#160;</span>
					<div class="help_text">
						<div class="help_title">&#160;</div>
						<div class="help_desc">
These functions are irreversible
						</div>
						<div class="help_title">Condense keratins</div>
						<div class="help_desc">
Take all nodes defined as keratins and condense them in one "generic keratin" node where the area is the sum of all areas.
						</div>
						<div class="help_title">Condense Ig's</div>
						<div class="help_desc">
Take all nodes defined as immunoglobulins and condense them in one "generic immunoglobulins" node where the area is the sum of all areas.
						</div>
						<div class="help_title">Condense Complements</div>
						<div class="help_desc">
Take all nodes defined as complements and condense them in one "generic complements" node where the area is the sum of all areas.
						</div>
						<div class="help_title">Delete Colour</div>
						<div class="help_desc">
Eliminate the colour codes shown for some proteins, based in reported concentrations in human blood plasma samples.
						</div>
					</div>
				</div>
			</div>

			<div class="group text">
				<div class="button" onClick="events.condensate('keratins');this.className='button mod3';" title="convert all keratin proteins into a single generic keratin protein">&#160;</div>
				<div class="button" onClick="events.condensate('immunoglobulins');this.className='button mod3';" title="convert all immunoglobulins proteins into a single generic immunoglobulins protein">&#160;</div>
				<div class="button" onClick="events.condensate('complements');this.className='button mod3';" title="convert all complement proteins into a single generic complement protein">&#160;</div>
				<div class="button" onClick="events.plasma_highlight();this.className='button mod3';" title="eliminate all colours used to highlight reported protein concentrations">&#160;</div>
			</div>
			<div class="group text labels">
				<div class="text" title="convert all keratin proteins into a single generic keratin protein">Condense keratins</div>
				<div class="text" title="convert all immunoglobulins proteins into a single generic immunoglobulins protein">Condense immunoglobulins</div>
				<div class="text" title="convert all complement proteins into a single generic immunoglobulins protein">Condense complements</div>
				<div class="text" title="eliminate all colours used to highlight reported protein concentrations">Delete Colour</div>
			</div>
		</div>


	</div>

	<div class="hit protein_0" id="hit_">
		<div id="calculate_width" style="width:auto;height:0px;float:none;">&#160;</div>
		<div class="container_prot_n protein_data_0"><div class="prot_n protein_data_0"><br />n</div></div>
		<div class="container_prot_chk protein_data_0">
			<div class="prot_chk">SEL<br />
				<a title="select all nodes" href="#" onClick="events.select_all_proteins(1);return false">(&#8595;)</a> 
				<a title="unselect all nodes" href="#" onClick="events.select_all_proteins(0);return false">(&#8593;)</a>
			</div>
		</div>
		<div class="container_prot_peptides protein_data_0"><div class="prot_peptides"><br />PEP</div></div>
		<div class="container_prot_analysis protein_data_0"><div class="prot_analysis">RUNS (<span id="number_or_proteins">&#160;</span> prot)<br />
			<xsl:for-each select="/proteins/number_of_protein_analysis/file">
				<div title="{.}" class="run_{position()}">&#160;</div>
			</xsl:for-each>
			</div>
		</div>
		<div class="container_prot_uniprot protein_data_0"><div class="prot_uniprot" title="Uniprot database"><br />UNIPROT</div></div>
		<div class="container_prot_desc protein_data_0"><div class="prot_desc"><br />DESCRIPTION</div></div>

		<div class="container_prot_vars protein_data_0">
			<div class="prot_vars">
				<div class="prot_AA" title="sequence">AA<br />
				<a href="#" onClick="events.sort_data(this,'prot_AA');return false">(&#8595;)</a>
				<a href="#" onClick="events.sort_data(this,'prot_AA',1);return false">(&#8593;)</a>
				</div>
				<div class="prot_pI" title="isoelectric point">pI<br />
				<a href="#" onClick="events.sort_data(this,'prot_pI');return false">(&#8595;)</a>
				<a href="#" onClick="events.sort_data(this,'prot_pI',1);return false">(&#8593;)</a>
				</div>
				<div class="prot_mass" title="molecular weight">MW<br />
				<a href="#" onClick="events.sort_data(this,'prot_mass');return false">(&#8595;)</a>
				<a href="#" onClick="events.sort_data(this,'prot_mass',1);return false">(&#8593;)</a>
				</div>
			</div>
		</div>

		<div class="container_prot_file_vars protein_data_0">
			<div class="prot_file_vars">
				<div class="prot_analysis_plus" title="view data from other files">&#160;</div>
				<div class="prot_analysis_data" title="data from this analysis">R&#160;</div>
				<div class="prot_score" title="score">Score<br />
				<a href="#" onClick="events.sort_data(this,'prot_score');return false">(&#8595;)</a>
				<a href="#" onClick="events.sort_data(this,'prot_score',1);return false">(&#8593;)</a>
				</div>

				<div class="prot_area" title="area">Area<br />
				<a href="#" onClick="events.sort_data(this,'prot_area');return false">(&#8595;)</a>
				<a href="#" onClick="events.sort_data(this,'prot_area',1);return false">(&#8593;)</a>
				</div>
				<div class="prot_area_percentage" title="area (percentage)">Area(&#8240;)<br />
				<a href="#" onClick="events.sort_data(this,'prot_area_percentage');return false">(&#8595;)</a>
				<a href="#" onClick="events.sort_data(this,'prot_area_percentage',1);return false">(&#8593;)</a>
				</div>

				<div class="prot_cover" title="coverage (percentage)">Cov(%)<br />
				<a href="#" onClick="events.sort_data(this,'prot_cover');return false">(&#8595;)</a>
				<a href="#" onClick="events.sort_data(this,'prot_cover',1);return false">(&#8593;)</a>
				</div>
				<div class="prot_num" title="other attributed proteins">Prot<br />
				<a href="#" onClick="events.sort_data(this,'prot_num');return false">(&#8595;)</a>
				<a href="#" onClick="events.sort_data(this,'prot_num',1);return false">(&#8593;)</a>
				</div>
				<div class="pep_num" title="peptides">PEP<br />
				<a href="#" onClick="events.sort_data(this,'pep_num');return false">(&#8595;)</a>
				<a href="#" onClick="events.sort_data(this,'pep_num',1);return false">(&#8593;)</a>
				</div>
				<div class="pep_unique" title="peptides (unique)">(Un)<br />
				<a href="#" onClick="events.sort_data(this,'pep_unique');return false">(&#8595;)</a>
				<a href="#" onClick="events.sort_data(this,'pep_unique',1);return false">(&#8593;)</a>
				</div>
				<div class="prot_mods" title="percentage of modified peptides">MOD's<br />
				<a href="#" onClick="events.sort_data(this,'prot_mods');return false">(&#8595;)</a>
				<a href="#" onClick="events.sort_data(this,'prot_mods',1);return false">(&#8593;)</a>
				</div>
			</div>
		</div>
	</div>
	</xsl:if>


	<div class="hit protein_rest" style="height:14px;" id="hit_{@hit}" onClick="events.select_protein(this.firstElementChild.nextSibling.firstElementChild.firstElementChild)">
		<div class="container_prot_n"><div class="prot_n"><xsl:value-of select="position()+$extra" />&#160;</div></div>
		<div class="container_prot_chk"><div class="prot_chk"><input type="checkbox" onClick="events.select_protein(this)" /></div></div>
		<div class="container_prot_peptides">
			<div class="prot_peptides">

				<xsl:choose>
				<xsl:when test="count(peptides/peptide) &gt; 0">
				<a href="#" title="view peptides detected of the protein" onClick="events.view_peptides(this,this.parentNode.parentNode.previousSibling.firstElementChild.firstElementChild);return false">
				<div class="icon"><div class="icon-plus-circle"></div><div class="icon-plus-line-1"></div><div class="icon-plus-line-2"></div></div>
				</a>
				</xsl:when>
				<xsl:otherwise>
				<a>&#160;</a>
				</xsl:otherwise>
				</xsl:choose>

			</div>
		</div>

		<div class="container_prot_analysis">
		<div class="prot_analysis">
			<xsl:for-each select="file"> <!-- each entry is information of a file -->
				<xsl:variable name="this_file">
				<xsl:value-of select="@name" />
				</xsl:variable>

				<xsl:for-each select="/proteins/number_of_protein_analysis/file">
					<xsl:if test=". = $this_file">
					<div title="{$this_file}" class="run_{position()}">&#160;</div>
					</xsl:if>
				</xsl:for-each>
			</xsl:for-each>
		</div>
		</div>

		<xsl:choose>
		<xsl:when test="remarked">

			<xsl:variable name="remarked_class">
			<xsl:choose>
			<xsl:when test="remarked/minimum = 1">container_prot_uniprot_remarked_low</xsl:when>
			<xsl:when test="remarked/minimum = 2">container_prot_uniprot_remarked_moderate</xsl:when>
			<xsl:when test="remarked/minimum = 3">container_prot_uniprot_remarked_moderate2</xsl:when>
			<xsl:when test="remarked/minimum = 4">container_prot_uniprot_remarked_high</xsl:when>
			<xsl:when test="remarked/minimum = 5">container_prot_uniprot_remarked</xsl:when>
			</xsl:choose>
			</xsl:variable>

			<div class="{$remarked_class}"> 
				<div class="trigger">
					<div class="prot_uniprot"><xsl:value-of select="accession/accs[@db='uniprot']" />&#160;</div>
					<div class="remarked_text">
						<div class="remarked_title">Protein information</div>
						<div class="remarked_desc">
<div>
This protein (<xsl:value-of select="accession/accs[@db='uniprot']" />) has been reported to have a human blood plasma concentration of
</div>
							<xsl:for-each select="remarked/value">
<div>
- <xsl:value-of select="concentration" /> ng/ml in the report <a href="{pubmed}" title="pubmed link"><xsl:value-of select="reference" /></a>
</div>
							</xsl:for-each>

						<div><br />Search this protein with Dasty (<a target="_blank" href="http://www.ebi.ac.uk/dasty/client/index.html?q={accession/accs[@db='uniprot']}">new window</a>)</div>
						<div>Search this protein with QuickGO (<a target="_blank" href="http://www.ebi.ac.uk/QuickGO/GProtein?ac={accession/accs[@db='uniprot']}">new window</a>)</div>
						<div>Search this protein with neXtProt (<a target="_blank" href="http://www.nextprot.org/db/search#{accession/accs[@db='uniprot']}">new window</a>)</div>
						<div>Search this protein with STRING (<a target="_blank" href="http://string-db.org/newstring_cgi/show_network_section.pl?identifier={accession/accs[@db='uniprot']}">new window</a>)</div>
						<div>Search this protein with Dbfetch (<a target="_blank" href="http://www.ebi.ac.uk/Tools/dbfetch/emblfetch?db=uniprotkb&amp;id={accession/accs[@db='uniprot']}">new window</a>)</div>
						<div>Search this protein with InterPro (<a target="_blank" href="http://www.ebi.ac.uk/interpro/protein/{accession/accs[@db='uniprot']}">new window</a>)</div>
						<div>Search this protein with Reactome (<a target="_blank" href="http://www.reactome.org/cgi-bin/search2?OPERATOR=ALL&amp;SPECIES=48887&amp;QUERY={accession/accs[@db='uniprot']}">new window</a>)</div>
						<div>Search this protein with PIR (<a target="_blank" href="http://pir.georgetown.edu/cgi-bin/textsearch.pl?sitesearch=on&amp;submit.x=0&amp;submit.y=0&amp;query0={accession/accs[@db='uniprot']}&amp;field0=ALL&amp;search=1">new window</a>)</div>
						<div>Search this protein with Protein Atlas (<a target="_blank" href="http://www.proteinatlas.org/search/{accession/accs[@db='uniprot']}">new window</a>)</div>
						<div>Search this protein with Pubmed (<a target="_blank" href="http://www.ncbi.nlm.nih.gov/pubmed/?term={accession/accs[@db='uniprot']}">new window</a>)</div>
						</div>
					</div>
				</div>

			</div>

		</xsl:when>
		<xsl:otherwise>

			<div class="container_prot_uniprot"> 
				<div class="trigger">
					<div class="prot_uniprot" title="Uniprot database"><xsl:value-of select="accession/accs[@db='uniprot']" />&#160;</div>
				</div>
			</div>

		</xsl:otherwise>
		</xsl:choose>

		<div class="container_prot_desc">
			<div class="prot_desc" title="description: {description}"><xsl:value-of select="description" />&#160;</div>
		</div>
		<div class="container_prot_vars">
			<div class="prot_vars">
				<div class="prot_AA" title="sequence"><xsl:value-of select="aas" />&#160;</div>
				<div class="prot_pI" title="isoelectric point"><xsl:value-of select="pi" />&#160;</div>
				<div class="prot_mass" title="molecular weight"><xsl:value-of select="mw" />&#160;</div>
			</div>
		</div>
		<div class="container_prot_file_vars">
			<xsl:for-each select="file"> <!-- each entry is information of a file -->
				<div class="prot_file_vars" >
					<div class="prot_analysis_plus">
					<xsl:if test="position()=1">
						<xsl:if test="count(../file) &gt; 1"> <!-- higher -->
							<a href="#" title="view information from files" onClick="events.view_other_files(this,this.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.firstElementChild.firstElementChild);return false">
							<div class="icon icon-plus"><div class="icon-plus-circle"></div><div class="icon-plus-line-1"></div><div class="icon-plus-line-2"></div></div>
							</a>
						</xsl:if>
					</xsl:if>&#160;</div>

					<xsl:variable name="this_file">
					<xsl:value-of select="@name" />
					</xsl:variable>
					
					<xsl:for-each select="/proteins/number_of_protein_analysis/file">
						<xsl:if test=". = $this_file">
						<div class="prot_analysis_data"><div title="{$this_file}" class="run_{position()}">&#160;</div></div>
						</xsl:if>
					</xsl:for-each>

					<div class="prot_score" title="score"><xsl:value-of select="score" />&#160;</div>

					<xsl:choose>
					<xsl:when test="area">
						<!-- not using substring-before to cut the decimals -->
						<div class="prot_area" title="area"><xsl:value-of select="concat(substring(area,1,4),'e',substring-after(area,'e'))" />&#160;</div>
						<div class="prot_area_percentage" title="area (percentage)"><xsl:value-of select="format-number(area_percentage,'0.00')" /> &#8240;</div>
					</xsl:when>
					<xsl:otherwise>
						<div class="prot_area" title="area">&#160;</div>
						<div class="prot_area_percentage" title="area (percentage)">&#160;</div>
					</xsl:otherwise>
					</xsl:choose>

					<div class="prot_cover" title="coverage (percentage)"><xsl:value-of select="coverage" />&#160;</div>
					<div class="prot_num" title="other attributed proteins"><xsl:value-of select="proteins_num" />&#160;</div>
					<div class="pep_num" title="peptides"><xsl:value-of select="peptides_num" />&#160;</div>
					<div class="pep_unique" title="peptides (unique)"><xsl:value-of select="unique_peptides" />&#160;</div>
					<xsl:choose>
					<xsl:when test="../percentage_of_modified_peptides != ''">
						<div class="prot_mods" title="posttranslational modifications (all files included)"><xsl:value-of select="../percentage_of_modified_peptides" /> &#37;</div>
					</xsl:when>
					<xsl:otherwise>
						<div class="prot_mods" title="posttranslational modifications (all files included)">-&#160;</div>
					</xsl:otherwise>
					</xsl:choose>
				</div>
			</xsl:for-each>
		</div>
		
		<div class="peptide_hits" style="display:none;"> <!-- display property needs to be here to be changed by JS without the 1-click delay -->
			<div class="hit_pep peptide_hit0_">
<!-- this calculate width is not used now, or am I wrong? to check... -->
				<div id="calculate_width_2_{@hit}" style="width:auto;height:0px;float:none;">&#160;</div> <!-- this div, with auto width, will allow me to know the exact width, float:none is mandatory -->

				<div class="peptides_separated">

					<div class="pep_confidence" title="confidence">C&#160;</div>
					<div class="pep_rank" title="rank">R</div>
					<div class="pep_score" title="score">S</div>
					<div class="pep_qvalue" title="q-value (%): minimum FDR at which the peptide is considered correct">q</div>
					<div class="pep_pep" title="posterior error probability (%): local FDR for the peptide, the probability that this peptide match is incorrect">PEP</div>
					<div class="pep_peptides_matched" title="peptides matched: peptide candidates that fall into the precursor mass tolerance window">P</div>
					<div class="pep_decoy_peptides_matched" title="peptides matched (decoy): peptide candidates that fall into the precursor mass tolerance window">Pd</div>
					<div class="pep_delta_mass" title="delta mass Da (ppm)">delta</div>

<!--
					<xsl:if test="peptides/peptide[1]/file[1]/area">
					<div class="pep_area" title="area">Area</div>
					</xsl:if>
-->

					<xsl:choose>
					<xsl:when test="peptides/peptide/file/area">
						<div class="pep_area" title="area">Area</div>
					</xsl:when>
					<xsl:otherwise>
						<div class="pep_area" title="area">&#160;</div>
					</xsl:otherwise>
					</xsl:choose>

					<div class="pep_intensity" title="intensity">Int</div>
					<div class="pep_iit" title="ion injection time (ms)">IIT&#160;</div>

					<div class="pep_protein_groups" title="Protein groups: {accessions}">Pg</div>
					<div class="pep_protein_related" title="Proteins related">Pr</div>

					<div class="pep_missed" title="missed cleaveages">MC</div>
					<div class="pep_modifications" title="modifications">M</div>
					<div class="pep_activation" title="activation">Ac</div>

					<div class="pep_charge" title="charge">Ch</div>
					<div class="pep_mz" title="m/z">m/z</div>
					<div class="pep_exp_mz" title="experimental m/z">(exp)</div>
					<div class="pep_rt" title="retention time">RT</div>
					<div class="pep_scan" title="first scan number">scan</div>
					<div class="pep_file" title="peptide found in which file">file</div>

				</div>
			</div>

			<xsl:for-each select="peptides/peptide"> <!-- each entry is a peptide, each peptide has the information split in files where it appears -->

			<div class="hit_pep" id="hit_{../../@hit}_peptide_hit_{@hit}">
				<div class="pep_seq" title="sequence (number of times found in the analysis)">Peptide <xsl:value-of select="sequence" /> (found <xsl:value-of select="file[last()]/@number+1" /> times)</div>

				<xsl:for-each select="file"> <!-- each file contains the information regarding the peptide found for that file -->
				<xsl:sort select="file_analysis" data-type="text"/>
				<xsl:sort select="file_found" data-type="text"/>
				<xsl:sort select="retention_time" data-type="number"/>
				<div class="peptides_separated">

					<div class="pep_confidence" title="confidence"><div class="peptide_{confidence}">&#160;</div></div>
					<div class="pep_rank" title="rank"><xsl:value-of select="rank" />&#160;</div>
					<div class="pep_score" title="score"><xsl:value-of select="score" />&#160;</div>
					<div class="pep_qvalue" title="q-value (%): minimum FDR at which the peptide is considered correct"><xsl:value-of select="format-number(round(10000*qvalue) div 100,'##0.00')" />&#160;</div>
					<div class="pep_pep" title="posterior error probability (%): local FDR for the peptide, the probability that this peptide match is incorrect"><xsl:value-of select="format-number(round(100*pepvalue) div 100,'##0.00')" />&#160;</div>
					<div class="pep_peptides_matched" title="peptides matched: peptide candidates that fall into the precursor mass tolerance window"><xsl:value-of select="peptides_matched" />&#160;</div>
					<div class="pep_decoy_peptides_matched" title="peptides matched (decoy): peptide candidates that fall into the precursor mass tolerance window"><xsl:value-of select="decoy_peptides_matched" />&#160;</div>
					<div class="pep_delta_mass" title="delta mass Da (ppm)"><xsl:value-of select="delta_mass" /> &#160;(<xsl:value-of select="delta_mass_ppm" />)</div>

					<xsl:choose>
					<xsl:when test="area">
						<div class="pep_area" title="area">
						<xsl:if test="not(area='')">
							<xsl:value-of select="concat(substring(area,1,4),'e',substring-after(area,'e'))" />
						</xsl:if>
						&#160;</div>
					</xsl:when>
					<xsl:otherwise>
						<div class="pep_area" title="area">&#160;</div>
					</xsl:otherwise>
					</xsl:choose>

					<div class="pep_intensity" title="intensity"><xsl:value-of select="concat(substring(intensity,1,4),'e',substring-after(intensity,'e'))" />&#160;</div>
					<div class="pep_iit" title="ion injection time (ms)"><xsl:value-of select="ion_inject_time" />&#160;</div>

					<div class="pep_protein_groups" title="Protein groups: {accessions}"><xsl:value-of select="protein_groups" />&#160;</div>
					<div class="pep_protein_related" title="Proteins related"><xsl:value-of select="proteins_rel" />&#160;</div>

					<div class="pep_missed" title="missed cleaveages"><xsl:value-of select="missed" />&#160;</div>
					<div class="pep_modifications" title="modifications: {modifications}"><xsl:if test="not(modifications[not(normalize-space())])">
					<xsl:value-of select="num_of_modifications" /><div class="icon"><div class="icon_modifications">&#42;</div></div></xsl:if>&#160;</div>
					<div class="pep_activation" title="activation"><xsl:value-of select="activation" />&#160;</div>

					<div class="pep_charge" title="charge"><xsl:value-of select="charge" />&#43;&#160;</div>
					<div class="pep_mz" title="m/z"><xsl:value-of select="format-number(round(100*mono_mass) div 10000,'##0.0000')" />&#160;</div>
					<div class="pep_exp_mz" title="experimental m/z"><xsl:value-of select="format-number(round(10000*exp_mass) div 10000,'##0.0000')" />&#160;</div>
					<div class="pep_rt" title="retention time"><xsl:value-of select="retention_time" />&#160;</div>
					<div class="pep_scan" title="first scan number"><xsl:value-of select="first_scan" />&#160;</div>

					<xsl:variable name="this_one">
					<xsl:value-of select="file_found" />
					</xsl:variable>

					<xsl:variable name="this_analysis">
					<xsl:value-of select="file_analysis" />
					</xsl:variable>

					<xsl:variable name="this_analysis_file">
						<xsl:for-each select="/proteins/number_of_protein_analysis/file">
						<xsl:if test=". = $this_analysis"> <!-- link file_analysis with a position() num -->
						<xsl:value-of select="position()" />
						</xsl:if>
						</xsl:for-each>
					</xsl:variable>

					<xsl:for-each select="/proteins/number_of_peptide_files/file">
						<xsl:if test=". = $this_one">
						<div class="run_{$this_analysis_file}" title="peptide found in the analysis {$this_analysis}">&#160;</div>
						<div class="pep_file_run_{position()}" title="peptide found in this file of the analysis: {$this_one}">&#160;</div>
						</xsl:if>
					</xsl:for-each>

				</div>
				</xsl:for-each>
			</div>
			</xsl:for-each>

		</div>
	</div>


</xsl:template>

</xsl:stylesheet>