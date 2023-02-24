import {

    ANNOUNCEMENT_REQUEST,
    ANNOUNCEMENT_FAIL,
    ANNOUNCEMENT_RESET,
    ANNOUNCEMENT_SUCCESS


} from '../constants/announcementConstants'
import axios from 'axios'


//GET LIST OF ANNOUNCEMENT
export const announcementAction = () => async (dispatch) => {
    try {
      dispatch({
        type: ANNOUNCEMENT_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      const { data } = await axios.get(
        `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/announcement/`,
        config
      );
  
      // Filter out future announcements
      const currentAndHistoricalAnnouncements = data.filter(
        (announcement) =>
          new Date(announcement.announcementSchedule) <= new Date()
      );

      currentAndHistoricalAnnouncements.sort((a, b) =>
        new Date(b.announcementSchedule) - new Date(a.announcementSchedule)
      );
  
      dispatch({
        type: ANNOUNCEMENT_SUCCESS,
        payload: currentAndHistoricalAnnouncements,
      });
    } catch (error) {
      dispatch({
        type: ANNOUNCEMENT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  