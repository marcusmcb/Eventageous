import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';
import ProfilesSearch from '../profiles/ProfilesSearch';
import DropDown from './DropDown'
import { timingSafeEqual } from 'crypto';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  state = {
    searchTerm: "",
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems = [];
    // loads spinner as profiles are being retrieved
    if (profiles === null || loading) {
      profileItems = <Spinner />;

    } else {
      
      if (profiles.length > 0) {
        console.log(this.state.searchTerm)
        profiles.forEach(profile => {
          // profiles search function
          let tmpAr = profile.skills.slice(0);
          profile.location && tmpAr.push(profile.location);
          profile.profession && tmpAr.push(profile.profession)
          tmpAr = tmpAr.map(e => e.toLowerCase().trim());
          // executes search function
          const isValid = tmpAr.find((val) => { 
            return RegExp(`.*${this.state.searchTerm}.*`).test(val);
          });          
          if(isValid !== undefined) {
            profileItems.push(<ProfileItem key={profile._id} profile={profile} />)
          } 
        });
      } else {
        profileItems = <h4>No profiles found.</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
<<<<<<< HEAD
              <h1 className="display-8 text-center">Event Professionals</h1>
=======
>>>>>>> aa6f5a976b255b0f614c891c6f878fae6fed8528
              <p className="lead text-center">
                Browse and connect with other Eventageous members.
              </p>
              <ProfilesSearch handleSearch={e => this.setState({ searchTerm: e })} />
              <DropDown handleProfession={e => this.setState({ searchTerm: e })} />
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
