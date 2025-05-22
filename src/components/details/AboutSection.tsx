import React from 'react';
import { Text } from 'react-native';

type AboutSectionProps = {
  description: string;
};

const AboutSection: React.FC<AboutSectionProps> = ({ description }) => {
  return (
    <Text style={{ marginTop: 20, textAlign: 'center' }}>
      {description || 'Pas encore de description.'}
    </Text>
  );
};

export default AboutSection;
