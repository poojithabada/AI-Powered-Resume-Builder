// ============================================
// ClassicPdf.jsx - Classic Template for PDF Export
// ============================================
// React-PDF version of ClassicTemplate.
// Uses @react-pdf/renderer primitives only.
// ============================================

import React from 'react';
import { Document, Page, View, Text, Link, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 40,
    fontFamily: 'Times-Roman',
    color: '#333333',
    fontSize: 10,
    lineHeight: 1.35,
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Times-Bold',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 6,
    fontSize: 9,
  },
  separator: {
    color: '#94a3b8',
  },
  hr: {
    borderBottom: '1px solid #333333',
    marginTop: 8,
    marginBottom: 12,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '1px solid #333333',
    paddingBottom: 2,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bold: {
    fontFamily: 'Times-Bold',
  },
  light: {
    fontSize: 9,
    color: '#555555',
  },
  text: {
    fontSize: 10,
    lineHeight: 1.4,
    marginBottom: 2,
  },
  bulletItem: {
    flexDirection: 'row',
    marginLeft: 12,
    marginTop: 2,
    marginBottom: 2,
  },
  bulletDot: {
    width: 12,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
  },
  link: {
    color: '#2563eb',
    textDecoration: 'underline',
    fontSize: 9,
  },
  skillLine: {
    fontSize: 10,
    lineHeight: 1.4,
    marginTop: 2,
  },
  projectHeader: {
    flexDirection: 'row', 
    alignItems: 'baseline', 
    gap: 6,
    marginBottom: 2
  }
});

const ClassicPdf = ({ 
  personalInfo = {}, 
  summary = '', 
  experience = [], 
  education = [], 
  skills = { technical: [], soft: [], languages: [] }, 
  projects = [], 
  certifications = [] 
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName || 'Your Full Name'}</Text>
          <View style={styles.contactRow}>
            {personalInfo.email && <Text>{personalInfo.email}</Text>}
            {personalInfo.email && personalInfo.phone && <Text style={styles.separator}>|</Text>}
            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo.phone && personalInfo.location && <Text style={styles.separator}>|</Text>}
            {personalInfo.location && <Text>{personalInfo.location}</Text>}
            {personalInfo.linkedIn && (
              <>
                <Text style={styles.separator}>|</Text>
                <Link src={personalInfo.linkedIn} style={styles.link}>LinkedIn</Link>
              </>
            )}
            {personalInfo.portfolio && (
              <>
                <Text style={styles.separator}>|</Text>
                <Link src={personalInfo.portfolio} style={styles.link}>Portfolio</Link>
              </>
            )}
          </View>
        </View>

        <View style={styles.hr} />

        {/* Summary */}
        {summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.text}>{summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <View style={styles.row}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={styles.bold}>{exp.role}</Text>
                    {exp.company && <Text> — {exp.company}</Text>}
                  </View>
                  <Text style={styles.light}>
                    {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}
                    {exp.current ? 'Present' : exp.endDate}
                  </Text>
                </View>
                {exp.bullets && exp.bullets.map((bullet, j) => (
                  <View key={j} style={styles.bulletItem}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <View style={styles.projectHeader}>
                  <Text style={styles.bold}>{proj.name}</Text>
                  {proj.link && <Link src={proj.link} style={styles.link}>Link</Link>}
                </View>
                {proj.description && <Text style={{ fontSize: 10, marginBottom: 2 }}>{proj.description}</Text>}
                {proj.technologies && proj.technologies.length > 0 && (
                  <Text style={[styles.light, { marginBottom: 2 }]}>
                    Technologies: {proj.technologies.join(', ')}
                  </Text>
                )}
                {proj.bullets && proj.bullets.map((bullet, j) => (
                  <View key={j} style={styles.bulletItem}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={[styles.row, { marginBottom: 4 }]}>
                <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                  <Text style={styles.bold}>{edu.degree}</Text>
                  {edu.field && <Text> in {edu.field}</Text>}
                  {edu.institution && <Text> — {edu.institution}</Text>}
                  {edu.gpa && <Text style={styles.light}> (GPA: {edu.gpa})</Text>}
                </View>
                <Text style={styles.light}>
                  {edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {skills.technical?.length > 0 && (
              <Text style={styles.skillLine}>
                <Text style={styles.bold}>Technical: </Text>
                {skills.technical.join(', ')}
              </Text>
            )}
            {skills.soft?.length > 0 && (
              <Text style={styles.skillLine}>
                <Text style={styles.bold}>Soft Skills: </Text>
                {skills.soft.join(', ')}
              </Text>
            )}
            {skills.languages?.length > 0 && (
              <Text style={styles.skillLine}>
                <Text style={styles.bold}>Languages: </Text>
                {skills.languages.join(', ')}
              </Text>
            )}
          </View>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert, i) => (
              <View key={i} style={[styles.row, { marginBottom: 3 }]}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'baseline' }}>
                  <Text style={styles.bold}>{cert.name}</Text>
                  {cert.issuer && <Text> — {cert.issuer}</Text>}
                  {cert.link && <Link src={cert.link} style={[styles.link, { marginLeft: 6 }]}>View</Link>}
                </View>
                {cert.date && <Text style={styles.light}>{cert.date}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ClassicPdf;