import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './MainPage.css';
import { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Button, Grid } from '@material-ui/core';
import SimpleSlider from '../../components/Slider/Slider';
import Avatar from '../../components/Avatar/Avatar';
import Description from '../../components/Description/Description';
import Developer from '../../components/Developer/Developer';
import MainPageNavigation from '../../components/MainPageNavigation/MainPageNavigation';
import GridGallery from '../../components/GridGalery/GridGalery';
import ru from '../../data/people';
import en from '../../data/peopleEN';
import be from '../../data/peopleBE';
import avatarVladMikulich from '../../img/developers/VladMikulich.jpg';
import avatarEroshkinPavel from '../../img/developers/PavelEroshkin1.jpg';
import store from '../../store/store';

function MainPage(props) {
  let data;
  if (props.lang === 'ru') {
    data = ru;
  } else if (props.lang === 'en') {
    data = en;
  } else if (props.lang === 'be') {
    data = be;
  }

  let authorDay;

  function getProfileRand() {
    const profileRand = Math.random() * 8;
    authorDay = Math.floor(profileRand);
    return Math.floor(profileRand);
  }
  const profile = data[getProfileRand()];

  return (
    <Grid>
      <Grid className="main-page" id="home">
        <Grid className="main-page-title">
          <p>
            <span className="portal">
              <FormattedMessage id="headerSubtitleSpan" />
            </span>
            <span>
              <FormattedMessage id="headerSubtitle" />
            </span>
          </p>
          <Grid className="mainpage-navigation-container">
            <AnchorLink offset="40px" href="#author">
              <FormattedMessage id="todayAuthor" />
            </AnchorLink>
            <AnchorLink offset="40px" href="#project-info">
              <FormattedMessage id="infoAboutPortal" />
            </AnchorLink>
            <AnchorLink offset="0px" href="#developers">
              <FormattedMessage id="developers" />
            </AnchorLink>
          </Grid>
        </Grid>
        <SimpleSlider />
        <MainPageNavigation />
        <section className="author-day" id="author">
          <h2 className="title-author-day">
            <FormattedMessage id="todayAuthor" />
          </h2>
          <Grid className="avatar-description">
            <Avatar data={profile} />
            <Grid>
              <Description data={profile} />
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                className="author-day-button"
              >
                <Button variant="contained" className="author-day__btn">
                  <FormattedMessage id="toAuthorPage">
                    {text => (
                      <Link
                        to={`/${props.lang}/personalpage/person${authorDay}`}
                        className="author-day__btn-text"
                        id={authorDay}
                        onClick={(e) => {
                          store.dispatch({
                            type: 'page',
                            value: `/${props.lang}/personalpage/person${authorDay}`,
                          });
                          localStorage.setItem(
                            'page',
                            `/${props.lang}/personalpage/person${authorDay}`,
                          );
                          props.onButtonClick(e);
                        }}
                      >
                        {text}
                      </Link>
                    )}
                  </FormattedMessage>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </section>
        <section className="description-mainpage" id="project-info">
          <h2>
            <FormattedMessage id="infoAboutPortal" />
          </h2>
          <FormattedHTMLMessage id="welcome" />
          <GridGallery data={profile} />
        </section>
      </Grid>
      <Grid className="developers-container" id="developers">
        <h2>
          <FormattedMessage id="developers" />
        </h2>
        <FormattedMessage id="purpose" />
        <Grid className="developers">
          <Developer
            name="Vlad Mikulich"
            gitHub="vmikulich"
            avatar={avatarVladMikulich}
          />
          <Developer
            name="Pavel Eroshkin"
            gitHub="paveleroshkinweb"
            avatar={avatarEroshkinPavel}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

MainPage.propTypes = {
  lang: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ lang: state.locales.lang });
export default connect(mapStateToProps)(MainPage);
