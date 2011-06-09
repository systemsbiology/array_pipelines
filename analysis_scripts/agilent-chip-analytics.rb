#!/tools/bin/ruby

require 'rubygems'
require 'json'
require 'fileutils'
require 'erb'

ARRAY_SHARE = "/net/arrays"
DESIGNS_FOLDER = ARRAY_SHARE + "/Agilent/designs"
ANALYTICS_JAR = ARRAY_SHARE + "/Tools/ChIPAnalytics/analytics.jar"

# message that gets passed back to UI
message_file = File.open("message.log", "w")

begin
  json_file = File.open("form.dat", "r")
  json_string = json_file.read
  json_string = /(.*?)=?$/.match(json_string)[1]

  begin
    job = JSON.parse(json_string)
  rescue Exception => e
    raise "Unable to parse JSON:\n" +
      "Error: #{e}\n" +
      "JSON string: #{json_string}\n"
  end

  microarrays = job["microarrays"]

  result_folders = []

  conditions = Hash.new
  microarrays.each do |microarray|
    chip_name = microarray['chip_name']
    condition = microarray['name']

    if( m = /25(\d{5})\d{5}/.match(chip_name) )
      design_id = m[1]
    else
      raise "Chip #{chip_name} does not appear to be an Agilent slide"
    end

    file_path = microarray["raw_data_path"]

    #complain if the path isn't under the ARRAY_SHARE
    if !file_path.include?(ARRAY_SHARE) || file_path.include?("..")
      raise "Path #{file_path} must lie under #{ARRAY_SHARE}"
    end

    if conditions[condition]
      if conditions[condition][:design_id] != design_id
        raise "Multiple chips for condition = #{condition} that don't have the same design id"
      end

      conditions[condition][:file_paths] << file_path
    else
      conditions[condition] = {
        :design_id => design_id,
        :file_paths => [file_path]
      }
    end
  end

  conditions.each do |condition, data|
    design_id = data[:design_id]
    file_paths = data[:file_paths]

    design_file = Dir.glob(DESIGNS_FOLDER + "/0#{design_id}*/*xml").grep(/\d{6}_D_(F|\d)/).first
    raise "Couldn't find design XML file for design ID #{design_id}" unless design_file

    file_path_xml = file_paths.collect{|p| "<DataFile xml:space=\"preserve\">#{p}</DataFile>"}.join("\n")

    template = ERB.new <<-EOF
<?xml version="1.0" encoding="UTF-8"?>
<ChIPAnalytics xmlns:cans="http://www.agilent.com/ChIPAnalytics">
<Experiments version="1.3">
  <Experiment name="<%= condition %>">
    <InputFiles>
      <DesignFile Name="<%= design_file %>">
        <%= file_path_xml %>
      </DesignFile>
    </InputFiles>
    <Components>
      <Component ConfigID="BlanksSubtractionNormalisationID" Enabled="true" Category="normalisation" Name="Blank subtraction normalization">
        <Options>
          <Option type="enum">
            <id xml:space="preserve">CentralTendencyEstimatorID</id>
            <value xml:space="preserve">median</value>
            <Enumerations>
              <Enumvalue xml:space="preserve">median</Enumvalue>
              <Enumvalue xml:space="preserve">one-step Tukey biweight</Enumvalue>
            </Enumerations>
          </Option>
        </Options>
        <OutputFiles>
        </OutputFiles>
      </Component>
      <Component ConfigID="MediansIntraArrayNormalisationID" Enabled="true" Category="normalisation" Name="Inter-array median normalization">
        <Options>
          <Option type="enum">
            <id xml:space="preserve">CentralTendencyEstimatorID</id>
            <value xml:space="preserve">median</value>
            <Enumerations>
              <Enumvalue xml:space="preserve">median</Enumvalue>
              <Enumvalue xml:space="preserve">one-step Tukey biweight</Enumvalue>
            </Enumerations>
          </Option>
        </Options>
        <OutputFiles>
        </OutputFiles>
      </Component>
      <Component ConfigID="IntraArrayMediansNormalisationID" Enabled="true" Category="normalisation" Name="Intra-array (dye-bias) median normalization">
        <Options>
          <Option type="enum">
            <id xml:space="preserve">NormalizeBasedOnID</id>
            <value xml:space="preserve">equalizing central tendencies of IP and WCE channels</value>
            <Enumerations>
              <Enumvalue xml:space="preserve">equalizing central tendencies of IP and WCE channels</Enumvalue>
              <Enumvalue xml:space="preserve">normalizing central tendency of log ratios to 1</Enumvalue>
            </Enumerations>
          </Option>
          <Option type="enum">
            <id xml:space="preserve">CentralTendencyEstimatorID</id>
            <value xml:space="preserve">median</value>
            <Enumerations>
              <Enumvalue xml:space="preserve">median</Enumvalue>
              <Enumvalue xml:space="preserve">one-step Tukey biweight</Enumvalue>
            </Enumerations>
          </Option>
        </Options>
        <OutputFiles>
        </OutputFiles>
      </Component>
      <Component ConfigID="LowessNormalisationID" Enabled="false" Category="normalisation" Name="Intra-array Lowess (intensity-dependent) normalization">
        <Options>
          <Option type="enum">
            <id xml:space="preserve">ProbesToRegressToID</id>
            <value xml:space="preserve">all data probes</value>
            <Enumerations>
              <Enumvalue xml:space="preserve">all data probes</Enumvalue>
              <Enumvalue xml:space="preserve">all common probes</Enumvalue>
              <Enumvalue xml:space="preserve">gene desert probes</Enumvalue>
            </Enumerations>
          </Option>
        </Options>
        <OutputFiles>
        </OutputFiles>
      </Component>
      <Component ConfigID="WhiteheadErrorModelID" Enabled="true" Category="error-model" Name="Whitehead Error Model v1.0">
        <Options>
          <Option type="boolean">
            <id xml:space="preserve">UseFixedFvalueID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="float">
            <id xml:space="preserve">FixedFvalueID</id>
            <value xml:space="preserve">0.2</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">DontSquareAdditiveErrorID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="enum">
            <id xml:space="preserve">StandardErrorSourceID</id>
            <value xml:space="preserve">Standard deviation of background pixels</value>
            <Enumerations>
              <Enumvalue xml:space="preserve">Standard deviation of background pixels</Enumvalue>
              <Enumvalue xml:space="preserve">Additive Error as computed by Agilent Feature Extractor</Enumvalue>
              <Enumvalue xml:space="preserve">Observed spread of negative controls</Enumvalue>
            </Enumerations>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">DoSubtractBackgroundFromSignalsID</id>
            <value xml:space="preserve">true</value>
          </Option>
        </Options>
        <OutputFiles>
        </OutputFiles>
      </Component>
      <Component ConfigID="WhiteheadPerArrayNeighbourhoodModelID" Enabled="true" Category="neighbourhood-model" Name="Whitehead Per-Array Neighbourhood Model v1.0">
        <Options>
          <Option type="int">
            <id xml:space="preserve">MaxDistBetweenNeigbhoursID</id>
            <value xml:space="preserve">1000</value>
          </Option>
          <Option type="float">
            <id xml:space="preserve">MaxPbarForCentralProbeInBndRgnID</id>
            <value xml:space="preserve">0.0010</value>
          </Option>
          <Option type="float">
            <id xml:space="preserve">MaxPvalForImportantNeighbourInBndRgnID</id>
            <value xml:space="preserve">0.0050</value>
          </Option>
          <Option type="int">
            <id xml:space="preserve">NumImportantNeighboursReqdForBoundRegionID</id>
            <value xml:space="preserve">1</value>
          </Option>
          <Option type="float">
            <id xml:space="preserve">MaxPvalueForCentreProbeInBoundRegionID</id>
            <value xml:space="preserve">0.0010</value>
          </Option>
          <Option type="float">
            <id xml:space="preserve">MaxPvalueForFlankingProbesInBoundRegionID</id>
            <value xml:space="preserve">0.1</value>
          </Option>
        </Options>
        <OutputFiles>
        </OutputFiles>
      </Component>
      <Component ConfigID="EranNirPeakDetection_v1.0_ID" Enabled="false" Category="neighbourhood-model" Name="Pre-defined Peak-shape Detection v1.0">
        <Options>
          <Option type="float">
            <id xml:space="preserve">Max_PvalueID</id>
            <value xml:space="preserve">0.01</value>
          </Option>
          <Option type="float">
            <id xml:space="preserve">Min_ScoreID</id>
            <value xml:space="preserve">0.0</value>
          </Option>
          <Option type="int">
            <id xml:space="preserve">Peak_Shape_MeanID</id>
            <value xml:space="preserve">500</value>
          </Option>
          <Option type="int">
            <id xml:space="preserve">Peak_Shape_stddevID</id>
            <value xml:space="preserve">200</value>
          </Option>
          <Option type="int">
            <id xml:space="preserve">Peak_BasePair_ResolutionID</id>
            <value xml:space="preserve">50</value>
          </Option>
          <Option type="int">
            <id xml:space="preserve">Num_RandomizationsID</id>
            <value xml:space="preserve">100</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">useErrorEstimatesID</id>
            <value xml:space="preserve">false</value>
          </Option>
        </Options>
        <OutputFiles>
        </OutputFiles>
      </Component>
      <Component ConfigID="VarianceStabilizationID" Enabled="false" Category="normalisation" Name="Variance Stabilization">
        <Options>
          <Option type="enum">
            <id xml:space="preserve">ProbesToRegressToID</id>
            <value xml:space="preserve">all data probes</value>
            <Enumerations>
              <Enumvalue xml:space="preserve">all data probes</Enumvalue>
              <Enumvalue xml:space="preserve">all common probes</Enumvalue>
              <Enumvalue xml:space="preserve">gene desert probes</Enumvalue>
            </Enumerations>
          </Option>
        </Options>
        <OutputFiles>
        </OutputFiles>
      </Component>
      <Component ConfigID="SegmentReportID" Enabled="true" Category="writer" Name="Segment Report">
        <Options>
          <Option type="boolean">
            <id xml:space="preserve">CreateSeperateFilesID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">MultOutFileID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="enum">
            <id xml:space="preserve">SortSegmentsEnumID</id>
            <value xml:space="preserve">best p[Xbar]</value>
            <Enumerations>
              <Enumvalue xml:space="preserve">locus</Enumvalue>
              <Enumvalue xml:space="preserve">best p[Xbar]</Enumvalue>
            </Enumerations>
          </Option>
          <Option type="enum">
            <id xml:space="preserve">SortProbesEnumID</id>
            <value xml:space="preserve">locus</value>
            <Enumerations>
              <Enumvalue xml:space="preserve">locus</Enumvalue>
              <Enumvalue xml:space="preserve">p[Xbar]</Enumvalue>
              <Enumvalue xml:space="preserve">p-value</Enumvalue>
            </Enumerations>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">ShowProbesID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">ProbesOneRowID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">CompleteFillID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="enum">
            <id xml:space="preserve">WhichMethodID</id>
            <value xml:space="preserve">base pairs</value>
            <Enumerations>
              <Enumvalue xml:space="preserve">base pairs</Enumvalue>
              <Enumvalue xml:space="preserve">non-bound probes</Enumvalue>
            </Enumerations>
          </Option>
          <Option type="int">
            <id xml:space="preserve">MaxGapInBPsID</id>
            <value xml:space="preserve">1000</value>
          </Option>
          <Option type="int">
            <id xml:space="preserve">MaxGapInProbesID</id>
            <value xml:space="preserve">1</value>
          </Option>
        </Options>
        <OutputFiles>
          <OutputFile xml:space="preserve">ChIP_Analytics_1.3_Output_Segment.tsv</OutputFile>
        </OutputFiles>
      </Component>
      <Component ConfigID="NormalisationsScaffoldingID" Enabled="false" Category="normalisation" Name="Normalization">
        <Options>
          <Option type="boolean">
            <id xml:space="preserve">NormalizeAdditiveErrorsID</id>
            <value xml:space="preserve">true</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">doSurrogateID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="float">
            <id xml:space="preserve">WCEsurrogationLevelID</id>
            <value xml:space="preserve">20.0</value>
          </Option>
          <Option type="float">
            <id xml:space="preserve">IPsurrogationLevelID</id>
            <value xml:space="preserve">20.0</value>
          </Option>
        </Options>
        <OutputFiles>
        </OutputFiles>
      </Component>
      <Component ConfigID="EranNirPeakDetection_v2.0_ID" Enabled="false" Category="neighbourhood-model" Name="Pre-defined Peak-shape Detection ** v2.0 **">
        <Options>
          <Option type="float">
            <id xml:space="preserve">Max_PvalueID</id>
            <value xml:space="preserve">0.01</value>
          </Option>
          <Option type="float">
            <id xml:space="preserve">Min_ScoreID</id>
            <value xml:space="preserve">0.0</value>
          </Option>
          <Option type="int">
            <id xml:space="preserve">Peak_Shape_MeanID</id>
            <value xml:space="preserve">500</value>
          </Option>
          <Option type="int">
            <id xml:space="preserve">Peak_Shape_stddevID</id>
            <value xml:space="preserve">200</value>
          </Option>
          <Option type="int">
            <id xml:space="preserve">Peak_BasePair_ResolutionID</id>
            <value xml:space="preserve">50</value>
          </Option>
          <Option type="int">
            <id xml:space="preserve">Num_RandomizationsID</id>
            <value xml:space="preserve">100</value>
          </Option>
          <Option type="int">
            <id xml:space="preserve">Window_Size_ID</id>
            <value xml:space="preserve">1000000</value>
          </Option>
          <Option type="int">
            <id xml:space="preserve">Sampling_ResolutionID</id>
            <value xml:space="preserve">25</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">OptimizePeakShapeID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">useErrorEstimatesID</id>
            <value xml:space="preserve">false</value>
          </Option>
        </Options>
        <OutputFiles>
        </OutputFiles>
      </Component>
      <Component ConfigID="Ensembl ID" Enabled="true" Category="writer" Name="Ensembl Report">
        <Options>
          <Option type="boolean">
            <id xml:space="preserve">MultOutFileID</id>
            <value xml:space="preserve">false</value>
          </Option>
        </Options>
        <OutputFiles>
          <OutputFile xml:space="preserve">ChIP_Analytics_1.3_Output_Ensembl.das</OutputFile>
        </OutputFiles>
      </Component>
      <Component ConfigID="Probe ID" Enabled="true" Category="writer" Name="Probe Report">
        <Options>
          <Option type="boolean">
            <id xml:space="preserve">CreateSeperateFilesID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">MultOutFileID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="enum">
            <id xml:space="preserve">SortByID</id>
            <value xml:space="preserve">p-value</value>
            <Enumerations>
              <Enumvalue xml:space="preserve">locus</Enumvalue>
              <Enumvalue xml:space="preserve">p-value</Enumvalue>
              <Enumvalue xml:space="preserve">p[Xbar]</Enumvalue>
            </Enumerations>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">ShowDataProbesID</id>
            <value xml:space="preserve">true</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">ShowControlProbesID</id>
            <value xml:space="preserve">true</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">ShowExcludedProbesID</id>
            <value xml:space="preserve">true</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">ShowCommonProbesID</id>
            <value xml:space="preserve">true</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">SingleTransciptsID</id>
            <value xml:space="preserve">false</value>
          </Option>
        </Options>
        <OutputFiles>
          <OutputFile xml:space="preserve">ChIP_Analytics_1.3_Output_Probe.tsv</OutputFile>
        </OutputFiles>
      </Component>
      <Component ConfigID="QCReportID" Enabled="true" Category="writer" Name="QC Report">
        <Options>
          <Option type="label">
            <id xml:space="preserve">QCReportID</id>
            <value/>
          </Option>
        </Options>
        <OutputFiles>
          <OutputFile xml:space="preserve">ChIP_Analytics_1.3_Output_QCReport.htm</OutputFile>
        </OutputFiles>
      </Component>
      <Component ConfigID="UCSCTrackID" Enabled="true" Category="writer" Name="UCSC Track Report">
        <Options>
          <Option type="boolean">
            <id xml:space="preserve">MultOutFileID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">outputprobes</id>
            <value xml:space="preserve">true</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">outputsegments</id>
            <value xml:space="preserve">true</value>
          </Option>
        </Options>
        <OutputFiles>
          <OutputFile xml:space="preserve">2514810103991 track probes.bed</OutputFile>
          <OutputFile xml:space="preserve">2514810103991 track segments.bed</OutputFile>
        </OutputFiles>
      </Component>
      <Component ConfigID="GFF ID" Enabled="true" Category="writer" Name="GFF Report">
        <Options>
          <Option type="boolean">
            <id xml:space="preserve">CreateSeperateFilesID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">MultOutFileID</id>
            <value xml:space="preserve">false</value>
          </Option>
        </Options>
        <OutputFiles>
          <OutputFile xml:space="preserve">ChIP_Analytics_1.3_Output_gff.tsv</OutputFile>
        </OutputFiles>
      </Component>
      <Component ConfigID="GeneReportID" Enabled="true" Category="writer" Name="Gene Report">
        <Options>
          <Option type="boolean">
            <id xml:space="preserve">CreateSeperateFilesID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">MultOutFileID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="enum">
            <id xml:space="preserve">SortGenesID</id>
            <value xml:space="preserve">locus</value>
            <Enumerations>
              <Enumvalue xml:space="preserve">name</Enumvalue>
              <Enumvalue xml:space="preserve">locus</Enumvalue>
              <Enumvalue xml:space="preserve">median of p[Xbar]</Enumvalue>
            </Enumerations>
          </Option>
          <Option type="enum">
            <id xml:space="preserve">SortProbesID</id>
            <value xml:space="preserve">locus</value>
            <Enumerations>
              <Enumvalue xml:space="preserve">locus</Enumvalue>
              <Enumvalue xml:space="preserve">p-value</Enumvalue>
              <Enumvalue xml:space="preserve">p[Xbar]</Enumvalue>
            </Enumerations>
          </Option>
          <Option type="int">
            <id xml:space="preserve">MinBoundProbesPerGeneID</id>
            <value xml:space="preserve">0</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">ShowProbesID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">ShowGenesOnlyID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">ProbesOneRowID</id>
            <value xml:space="preserve">false</value>
          </Option>
          <Option type="boolean">
            <id xml:space="preserve">CompleteFillID</id>
            <value xml:space="preserve">false</value>
          </Option>
        </Options>
        <OutputFiles>
          <OutputFile xml:space="preserve">ChIP_Analytics_1.3_Output_Gene.tsv</OutputFile>
        </OutputFiles>
      </Component>
      <Component ConfigID="DyeSwapNormalizationID" Enabled="false" Category="normalisation" Name="Swap Dyes on all arrays">
        <Options>
        </Options>
        <OutputFiles>
        </OutputFiles>
      </Component>
      <Component ConfigID="AgilentArrayDataReaderID" Enabled="true" Category="reader" Name="Agilent Feature Extractor Data Reader">
        <Options>
          <Option type="boolean">
            <id xml:space="preserve">UseNormalizedSignalsID</id>
            <value xml:space="preserve">false</value>
          </Option>
        </Options>
        <OutputFiles>
        </OutputFiles>
      </Component>
    </Components>
    <outputDirectory xml:space="preserve">.</outputDirectory>
  </Experiment>
</Experiments>
</ChIPAnalytics>
    EOF

    xml_file = File.open("#{condition}.xml", "w")
    xml_file << template.result(binding)
    xml_file.close

    puts "Adding /tools/java/jdk1.6.0/jre/bin/java -Xmx767M -jar #{ANALYTICS_JAR} -f #{condition}.xml\n"
    system("/tools/java/jdk1.6.0/jre/bin/java -jar #{ANALYTICS_JAR} -f #{condition}.xml")

    result_folders << condition
  end

  zip_file = "ChIPAnalytics_#{Time.now.strftime("%Y-%m-%d")}"

  `zip #{zip_file} -r #{result_folders.join(" ")}`
rescue Exception => e
  message_file << e.to_s
end
