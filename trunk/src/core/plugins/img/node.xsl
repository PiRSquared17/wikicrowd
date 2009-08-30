<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns="http://www.w3.org/1999/xhtml"
	exclude-result-prefixes="">
	<xsl:output 
		method="xml" 
		version="1.0" 
		indent="no" 
		encoding="utf-8"
		omit-xml-declaration="yes"
		cdata-section-elements="text"/>

	<xsl:template match="*[@type='img']" mode="wiki">
		<p class="text"><xsl:if test="@deleted"><xsl:attribute name="class">text deleted</xsl:attribute></xsl:if><img src="{text}" alt=""/></p>
	</xsl:template>

	<xsl:template match="*[@type='img']/text" mode="diff">
		<xsl:apply-templates select="."/>
	</xsl:template>

	<xsl:template match="*[@type='img']" mode="form"><text><xsl:value-of select="text/text()"/></text></xsl:template>
</xsl:stylesheet>
