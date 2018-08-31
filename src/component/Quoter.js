import React, { Component } from "react";
import axios from "axios";
import Parser from "html-react-parser";
import styled, { css } from "styled-components";
import { TwitterIcon } from "react-share";

const Anchor = styled.a`
  text-decoration: none;
  margin-top: 0.5em;
`;

const Button = styled.button`
  border: 2px solid palevioletred;
  border-radius: 3px;
  padding: 0.75em 0.25em;
  margin-top: 0.25em;

  ${props =>
    props.primary &&
    css`
      background: lightcoral;
      color: white;
    `};
`;

const HeaderOne = styled.h1`
  color: lightcoral;
  font-weight: normal;
  font-family: "Orienta", sans-serif;
  font-size: 40px;
  line-height: 15px;
  margin: 25px 0 20px 0;
`;

const HeaderTwo = styled.h2`
  color: midnightblue;
  font-weight: normal;
  font-family: "Orienta", sans-serif;
  font-size: 25px;
  line-height: 40px;
  border: 1px solid #fff;
  box-shadow: 1px 1px 1.5em rgba(0, 0, 0, 0.25);
  margin: -10px 2em 20px 2em;
`;

const Paragraph = styled.p`
  font-weight: normal;
  font-family: "Orienta", sans-serif;
  border: 1px solid #fff;
  box-shadow: 1px 1px 1.5em rgba(0, 0, 0, 0.25);
  padding: 1em 0 1em 0;
  margin: 1em 22em 0 22em;
`;

class Quoter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: {
        title: "",
        content: "",
        link: ""
      },
      hasQuote: false
    };
  }

  getQuote = event => {
    axios
      .get(
        `https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&timestamp=${new Date().getTime()}`
      )
      .then(response => {
        const { quote } = this.state;
        quote.title = response.data[0].title;
        quote.content = response.data[0].content;
        quote.link = response.data[0].link;
        this.setState({ hasQuote: true });
      })
      .catch(err => {
        console.log(`${err} while performing GET request.`);
      });
  };

  createQuote = () => {
    const { title, content, link } = this.state.quote;
    const parsedTitle = Parser(title);
    const parsedContent = Parser(content);

    return (
      <div>
        <Anchor href={link} target="_blank">
          <h2
            style={{
              color: "midnightblue",
              fontWeight: "normal",
              fontFamily: "Orienta, sans-serif",
              fontSize: "40px"
            }}
          >
            {parsedTitle}
          </h2>
          <HeaderTwo>{parsedContent}</HeaderTwo>
        </Anchor>
        <Anchor
          style={{
            display: "inline-block",
            textAlign: "center",
            marginRight: "30px"
          }}
          href={`https://twitter.com/intent/tweet?text=${
            parsedContent[0].props.children
          }Quote by: ${parsedTitle}`}
        >
          <TwitterIcon size={50} round={true} />
        </Anchor>
        <Paragraph>
          Click on the <em>author</em> or <em>quote</em> and head to the source.
          <br />
          <br />
          Click on the Twitter icon to share the tweet!
        </Paragraph>
      </div>
    );
  };

  render() {
    const { hasQuote } = this.state;
    return (
      <div>
        <div style={{ marginRight: "30px" }}>
          <HeaderOne>Quoter</HeaderOne>
          <Button primary onClick={this.getQuote}>
            Click here for a quote
          </Button>
        </div>
        <br />
        {hasQuote === true ? this.createQuote() : ""}
      </div>
    );
  }
}

export default Quoter;
