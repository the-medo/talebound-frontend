import React from "react";
import {Col, Container, Row, Text} from "@nextui-org/react";

interface PageTermsOfServiceProps {
  offset?: number;
}

const PageTermsOfService: React.FC<PageTermsOfServiceProps> = ({offset = 3}) => {
  return (
    <Container css={{padding: '$10'}}>
      <Row>
        <Col offset={offset} span={12-(2*offset)}>
          <Text h2>Terms of service</Text>

          <Text>By using the Talebound website and services, you agree to be bound by the following Terms of Service:</Text>
          <ol>
            <li><Text b>Eligibility</Text></li>
            <Text>You must be at least 13 years of age to use Talebound. By using our website and services, you represent that you are eligible to use our platform and agree to comply with these Terms of Service.</Text><br/>

            <li><Text b>Content and Conduct</Text></li>
            <Text>You are responsible for the content you create and share on Talebound, including the worlds, characters, and text you post. You agree not to post content that is unlawful, harassing, defamatory, abusive, threatening, or otherwise objectionable.</Text><br/>

            <li><Text b>Intellectual Property</Text></li>
            <Text>You retain ownership of the content you create on Talebound. By using our services, you grant Talebound a non-exclusive, royalty-free, worldwide license to use, display, and distribute your content on our platform.</Text><br/>

            <li><Text b>Account Security</Text></li>
            <Text>You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized access or use of your account.</Text><br/>

            <li><Text b>Limitation of Liability</Text></li>
            <Text>Talebound is provided &quot;as is&quot; and without warranties of any kind. We shall not be liable for any damages, including direct, indirect, incidental, or consequential damages, arising out of the use or inability to use our website or services.</Text><br/>

            <li><Text b>Changes to the Terms of Service</Text></li>
            <Text>We may update these Terms of Service from time to time. Any changes will be posted on this page, and your continued use of Talebound constitutes your acceptance of any changes to the Terms of Service.</Text><br/>

            <li><Text b>Termination</Text></li>
            <Text>We reserve the right to terminate your access to Talebound at any time, with or without cause, and without prior notice.</Text><br/>
          </ol>
          <Text b>Last updated:</Text> 27th April, 2023
        </Col>
      </Row>
    </Container>
  );
}

export default PageTermsOfService;