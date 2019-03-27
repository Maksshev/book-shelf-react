import React, {Component} from 'react';
import moment from 'moment-js';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getBooksByReviewer} from "../../actions/userActions";

class UserPosts extends Component {


    componentDidMount() {
        this.props.dispatch(getBooksByReviewer(this.props.user._id));
    }


    showUserPosts = () => (
        this.props.posts ?
            this.props.posts.map((review) => (
                <tr key={review._id}>
                    <td>
                        <Link to={`/user/edit-post/${review._id}`}>
                            {review.name}
                        </Link>
                    </td>
                    <td>{review.author}</td>
                    <td>{moment(review.createAt).format("MM/DD/YY")}</td>
                </tr>
            ))
            :
            null
    );


    render() {
        return (
            <div className="user_posts">
                <h4>Your reviews:</h4>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                <tbody>
                {this.showUserPosts()}
                </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.userReducer.posts
    }
};

export default connect(mapStateToProps)(UserPosts);