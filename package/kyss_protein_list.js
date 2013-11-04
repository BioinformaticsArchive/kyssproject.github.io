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

*/



//...................................................

function process_list_of_proteins() 
	{
	this.list = new list_of_proteins();
	this.accessions = new Array();
	this.pubmed = new Array();
	this.data = new Array();

	var lines = new Array();
	lines = this.list.data.split("*");
	lines.pop(); // erase the last line that is empty

	for (i in lines) // each line is a protein entry
		{
		var pieces = new Array();
		pieces = lines[i].split("\t");
		var struct = new Array();

		for (var k=1;k<10;k++)
			{
			struct.push(pieces[k]);
			}

		this.accessions.push(pieces[0]);
		this.data.push(struct);
		}
	}

function list_of_proteins() 
	{
	this.data = "\
P05362	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	43	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	238	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	180		*\
P04278	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	6500	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	1700	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	5000		*\
P05154	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	300	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	4400	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	5000		*\
P36955	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	5000	Hortin et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/18687737	4650	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	5000		*\
P03951	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	5000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	4800	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	5000		*\
P06276	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	5000	Hortin et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/18687737	5100	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	5000		*\
P12259	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	9000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	6600	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	10000		*\
P04275	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	110.0	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	9000	Hortin et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/18687737	14400	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	15000	*\
P08697	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	60000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	70000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	50000		*\
P01019	Katsurada et al, 2007	http://www.ncbi.nlm.nih.gov/pubmed/17553939	63000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	50000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	60000		*\
P10909	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	101000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	75000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	60000		*\
P05546	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	90000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	52000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	90000		*\
P04004	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	340	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	100000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	100000		*\
P02749	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	225000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	160000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	200000		*\
P01008	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	320000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	200000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	210000		*\
P05155	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	280000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	137000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	300000		*\
P02751	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	400.0	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	350000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	300000		*\
P27169	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	59000.0	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	59000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	350000		*\
P00450	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	210000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	420000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	400000		*\
P01011	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	450000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	290000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	500000		*\
P00738	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	880000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	620000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	800000		*\
P04114	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	720000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	730000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	800000		*\
P02790	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	750000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	760000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	800000		*\
P02679	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	670000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	760000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	1000000		*\
P02675	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	970000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	800000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	1000000		*\
P01009	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	1100000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	1400000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	1400000		*\
P01023	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	1400000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	1800000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	2100000		*\
P14151	Shimada et al, 2001	http://www.ncbi.nlm.nih.gov/pubmed/11472411	700	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	1600	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	0.67		*\
P0DJI8	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	36000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	4000	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	20000.0		*\
P01266	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	1.0	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	1			*\
P06731	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	1.0	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	1			*\
P33151	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	30	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	2			*\
P16422	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	2.0	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	2			*\
P08571	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	1900.0	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	4			*\
Q04756	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	400.0	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	4			*\
P01236	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	16.0	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	16			*\
P02771	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.29	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	20			*\
P10646	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	78.0	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	23			*\
P20023	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	60			*\
P10645	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	65	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	65			*\
P01033	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	14	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	80			*\
P05019	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	214	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	144			*\
P07996	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	214	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	200			*\
P16070	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	33	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	250			*\
P01034	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	320	Hortin et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/18687737	780			*\
P24821	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	1000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	1000			*\
P05109	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	1000	Hortin et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/18687737	1070			*\
P06702	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	1300	Hortin et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/18687737	1320			*\
Q9UBX7	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	2200.0	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	2150			*\
P02741	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2020	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	2300			*\
P11226	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	97	Hortin et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/18687737	2400			*\
P04070	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	3700	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	3000			*\
Q15848	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	10000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	4800			*\
P17936	Safarinejad et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21536469	4577	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	5000			*\
P00740	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	4500	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	5100			*\
P00533	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	11	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	6940			*\
Q14520	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	10000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	7500			*\
O14791	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	8000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	8200			*\
P00742	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	10000			*\
P05160	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	4800	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	10000			*\
P00488	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	5200	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	10000			*\
Q96IY4	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	9500	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	10000			*\
P29622	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	14000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	14000			*\
O75636	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	15000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	15000			*\
P05543	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	19000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	20000			*\
P06681	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	20500	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	20000			*\
P07225	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	25000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	21000			*\
P27918	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	25000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	25000			*\
P02750	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	20000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	30000			*\
P05156	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	20000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	30000			*\
P80108	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	55000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	30000			*\
P08185	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	70000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	30000			*\
P00748	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	30000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	30000			*\
P08519	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	20500	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	38000			*\
P02649	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	34000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	40000			*\
P25311	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	45000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	40000			*\
P03952	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	50000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	40000			*\
P07357	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	47000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	45000			*\
P35542	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	50000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	50000			*\
P02748	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	53000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	50000			*\
P02745	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	60000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	55000			*\
P09871	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	80000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	80000			*\
P43652	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	85000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	80000			*\
P05090	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	140000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	90000			*\
P02760	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	60000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	100000			*\
P04196	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	100000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	100000			*\
P00734	Molecular Innovations, Human Prothrombin total antigen assay ELISA kit	http://www.mol-innov.com/item/Human-Prothrombin-total-antigen-assay-ELISA-kit	150000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	100000			*\
P0C0L4	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	230000.0	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	100000			*\
P00750	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	3.7	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	100000			*\
P02656	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	120000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	120000			*\
P06727	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	240000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	160000			*\
P01042	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	70000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	180000			*\
P19827	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	180000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	180000			*\
Q14624	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	180000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	180000			*\
P19823	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	210000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	200000			*\
P04217	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	225000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	200000			*\
P02652	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	300000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	240000			*\
P02763	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	690000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	310000			*\
P04003	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	365000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	350000			*\
P08603	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	30000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	500000			*\
P02765	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	610000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	800000			*\
P01024	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	950000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	1300000			*\
P02647	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	1400000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	1400000			*\
P02671	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2720000	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	1700000			*\
P02787	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2300000	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	3000000			*\
P01258	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.19	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	0.01			*\
P61278	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.02	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	0.02			*\
P26927	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	59.0	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	0.02			*\
P09603	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	26	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	0.07			*\
P01233	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.1	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	0.1			*\
P15692	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.2	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	0.2			*\
P14210	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.33	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	0.2			*\
P01241	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.4	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	0.4			*\
O43240	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.4	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	0.44			*\
P01350	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.7	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	0.69			*\
P01589	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.162	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	1.42			*\
P07288	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	1.9	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	1.86			*\
P04626	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	11.0	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	11.2			*\
P80188	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	87	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	2.5			*\
Q92876	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2.9	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	2.9			*\
Q08380	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	9100	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	5.3			*\
P22455	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2				*\
P48594	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2				*\
P05111	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	3				*\
Q01638	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	7				*\
P05121	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	8				*\
O15467	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	11				*\
P18065	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	15				*\
Q13740	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	16				*\
P05062	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	20				*\
P09972	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	20				*\
P00995	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	21				*\
Q8N6C8	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	25				*\
P36222	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	28				*\
P03973	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	32				*\
P16035	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	34				*\
P17813	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	34				*\
P18827	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	40				*\
P14780	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	41				*\
P59665	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	42				*\
P02792	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	50				*\
P02794	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	50				*\
P05787	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	50				*\
P19320	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	94				*\
P07477	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	99				*\
Q16853	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	120				*\
P04075	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	171				*\
P16109	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	189				*\
P02788	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	265				*\
P40189	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	273				*\
P10721	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	333				*\
P01344	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	380				*\
P03950	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	400				*\
P02786	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	580				*\
P61769	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	1100				*\
P55056	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2500				*\
O95445	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	3000				*\
P00746	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	3000				*\
P18428	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	5000				*\
P54108	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	5500				*\
Q15485	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	7000				*\
P12830	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	7030				*\
P61626	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	8100				*\
P05452	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	8200				*\
P20742	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	8380				*\
Q8IWX2	Hortin et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/18687737	11250				*\
P14618	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	15000				*\
P07360	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	16500				*\
A8MUN2	Hortin et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/18687737	18900				*\
P22352	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	19000				*\
P02753	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	31700				*\
P68871	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	32500				*\
P69905	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	32500				*\
P01591	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	35000				*\
P02655	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	40000				*\
P02743	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	40000				*\
P23142	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	40000				*\
P07358	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	47000				*\
P01031	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	50000				*\
P02747	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	50000				*\
P20851	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	50000				*\
P10643	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	52000				*\
P02746	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	55000				*\
P06744	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	55000				*\
P02654	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	61000				*\
Q16505	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	100000				*\
P00747	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	140000				*\
Q06033	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	150000				*\
P02766	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	260000				*\
P00751	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	300000				*\
P06396	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	300000				*\
P02774	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	550000				*\
P19652	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	610000				*\
P02768	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	40000000				*\
O00533	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	0.0000001				*\
P01374	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.0000001				*\
P01375 	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.0000001				*\
P01583	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.0000001				*\
P01584	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.0000001				*\
P05107	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	0.0000001				*\
P05231	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.0000001				*\
P08922	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	0.0000001				*\
P10147	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.0000001				*\
P16144	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	0.0000001				*\
P40933	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.0000001				*\
P56199	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	0.0000001				*\
P60568	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.0000001				*\
Q13876	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	0.0000001				*\
Q15465	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	0.0000001				*\
Q9NYQ8	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	0.0000001				*\
P07108	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.00104				*\
P05112	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.002				*\
P05113	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.008				*\
P15248	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.008				*\
Q16552	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.008				*\
P04141	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.009				*\
P09038	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.011				*\
P13232	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.011				*\
P22301	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.013				*\
P13500 	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.017				*\
P35225	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.017				*\
P09341	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.019				*\
P15018	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.019				*\
P51671	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.026				*\
P09919	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.029				*\
P80098	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.032				*\
P01563	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.042				*\
P50591	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.052				*\
O88596 	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.06				*\
P08700	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.068				*\
P48061	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.074				*\
P35318	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.0741				*\
P01579	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.09				*\
P23297	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.09				*\
O15392	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.1				*\
P04271	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.1				*\
P08833 	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.1				*\
P10145	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.1				*\
P13236	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.1				*\
P29965	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.1				*\
P29460	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.115				*\
Q14116	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.117				*\
P14784	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.162				*\
O00585	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.172				*\
P01116	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.2				*\
P13500	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.2				*\
P13726	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.2				*\
P21741	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.2				*\
Q9P0G3	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.2				*\
P08473	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.245				*\
P13501	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.279				*\
Q14005	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.287				*\
P02452	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.29				*\
Q07325	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.31				*\
P01127	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.32				*\
P02778	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.325				*\
P42830	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.4				*\
P49771 	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.4				*\
P08887	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.453				*\
P14174	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.465				*\
Q4LDE5	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.54				*\
P19883	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.68				*\
P01138	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.7				*\
P51654	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.7				*\
Q9Y4X3	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	0.796				*\
P43489	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.8				*\
P00451	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.83				*\
P19438	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	0.9				*\
P16581	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.92				*\
Q15223	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.92				*\
Q6P179	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	0.98				*\
Q13219	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	1.0				*\
P07711	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	1.1				*\
Q99650	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	1.1				*\
P09104	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	1.4				*\
O15123	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	1.5				*\
P25445	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	1.5				*\
Q5ZPR3	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	1.5				*\
P18510	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	1.55				*\
P04080	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	1.7				*\
P48551	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	1.7				*\
P17181	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	1.71				*\
P01588	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	100.0				*\
P24591	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	110.0				*\
P12821	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	120.0				*\
P35968	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	15.0				*\
P21815	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	150.0				*\
Q6P1Q0 	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	15000.0				*\
Q16881	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	18.0				*\
P05164	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	180.0				*\
P09493	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	2.0				*\
P07858	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2.1				*\
Q07075	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2.1				*\
Q08ET2	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2.2				*\
P01137	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	2.3				*\
Q16620	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2.3				*\
P08727	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2.4				*\
Q9Y275	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	2.5				*\
Q8N6Q3	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2.7				*\
Q9HBW9	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	2.8				*\
P00709	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	20.0				*\
P32942	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	200.0				*\
P48357	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	21.0				*\
P05556	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	2100.0				*\
P23560	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	24.0				*\
P48023	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	25.0				*\
P07333	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	26.0				*\
Q03405	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	3.0				*\
various	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	3.0				*\
P01040	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	3.2				*\
O14798	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	3.4				*\
P15309	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	3.5				*\
Q9Y240 	Khan, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22634087	3.56				*\
O95998	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	3.9				*\
P17948	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	30.0				*\
P13688	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	300.0				*\
P55774	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	31.0				*\
P21583	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	330.0				*\
P15529	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	35.0				*\
O43245 	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	37.0				*\
P05783	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	4.0				*\
P20333	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	4.0				*\
Q15389	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	4.0				*\
P29508	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	4.2				*\
P41159	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	4.8				*\
P05186	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	40.7				*\
P59666	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	42.0				*\
P10451	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	440.0				*\
Q9NY97	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	5.8				*\
P05106	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	5500.0				*\
P15531	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	6.1				*\
Q8WWZ8	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	6.4				*\
P16284	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	6.6				*\
Q9ULI3	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	6.6				*\
P16112	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	7.1				*\
P27930	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	7.1				*\
Q99733	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	7.5				*\
P08118	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	710.0				*\
P40225	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	78.0				*\
P08254	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	8.0				*\
Q02763	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	8.5				*\
Q16627	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	8.5				*\
P08253	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	8.8				*\
Q16674	Polanski et Anderson, 2006	http://www.ncbi.nlm.nih.gov/pubmed/19690635	8.8				*\
P07339	Liu et al, 2005	http://www.ncbi.nlm.nih.gov/pubmed/16335952	8.9				*\
P02776	Farrah et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/21632744	9.7				*\
P01189	Schiess et al, 2008	http://www.ncbi.nlm.nih.gov/pubmed/19383365	0.01				*\
P01871	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	1000000				*\
P06732	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	190				*\
P08709	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	500				*\
P08833	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	9				*\
P0C0L5	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	60000				*\
P13473	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	1				*\
P22105	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	450				*\
P22891	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	1900				*\
P24158	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	23				*\
P35916	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	15				*\
P40197	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	78				*\
P41222	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	400				*\
P48740	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	8000				*\
P49908	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	3000				*\
Q15166	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	1700				*\
Q9UNN8	Domanski et al, 2012	http://www.ncbi.nlm.nih.gov/pubmed/22577024	100				*\
P55058	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	10000				*\
Q03591	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	35000				*\
Q6UXB8	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	1000				*\
Q76LX8	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	800				*\
Q86VB7	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	2				*\
Q96KN2	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	4000				*\
Q9NZP8	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	4000				*\
Q9UGM5	Drake et al, 2011	http://www.ncbi.nlm.nih.gov/pubmed/20705048	5000				*\
O00175	Palikhe et al, 2010	http://www.ncbi.nlm.nih.gov/pubmed/19796209	0.815				*\
";
	}

