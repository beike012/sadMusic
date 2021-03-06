import React, { Component } from 'react';
import {
  getMvUrl,
  getMvDetail,
  getMvDetailInfo,
  getRelatedVideo
} from '@/api/mv';
import TopMenu from '@/components/TopMenu';
import Comment from '@/components/Comment';
import SideDownload from '@/components/SideDownload';
import MvBtnGroup from '@/components/MvBtnGroup';
import MVRecommend from '@/components/MVRecommend';
import styles from './index.module.scss';
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoSrc: '',
      isMuted: true,
      mvDetail: {},
      mvDetailInfo: {},
      relatedVideo: []
    };
  }
  componentDidMount() {
    this.getMvUrlFn();
    this.getMvDetailFn();
    this.getMvDetailInfoFn();
    this.getRelatedVideoFn();
  }
  async getMvUrlFn() {
    const res = await getMvUrl(this.props.match.params.mvid || '');
    this.setState({
      videoSrc: res.data.url
    });
  }
  async getMvDetailFn() {
    const res = await getMvDetail(this.props.match.params.mvid || '');
    this.setState({
      mvDetail: res.data
    });
  }
  async getMvDetailInfoFn() {
    const res = await getMvDetailInfo(this.props.match.params.mvid || '');
    this.setState({
      mvDetailInfo: res
    });
  }
  async getRelatedVideoFn() {
    const res = await getRelatedVideo(this.props.match.params.mvid || '');
    console.log(res.data);
    this.setState({
      relatedVideo: res.data
    });
  }
  getPlayCount(num) {
    // 大于十万的转换
    if (num < 100000) {
      return num;
    } else {
      return Math.floor(num / 10000) + '万';
    }
  }
  render() {
    return (
      <div className={styles['mv-outer-wrap']}>
        <TopMenu history={this.props.history}></TopMenu>
        <div className={styles['mv-main-content']}>
          <div className={styles['mv-left-content']}>
            <div className={styles['mv-title']}>
              <i></i>
              <div className={styles['mv-title-div']}>
                <h2>{this.state.mvDetail.name}</h2>
                <a className={styles['mv-title-a']} href="/">
                  {this.state.mvDetail.artistName}
                </a>
              </div>
            </div>
            <video autoPlay controls src={this.state.videoSrc}></video>
            <MvBtnGroup
              likedCount={this.state.mvDetailInfo.likedCount}
              subCount={this.state.mvDetail.subCount}
              shareCount={this.state.mvDetail.shareCount}
            ></MvBtnGroup>
            <Comment commentCount={this.state.mvDetail.commentCount} mvid={this.props.match.params.mvid}></Comment>
          </div>
          <div className={styles['mv-right-content']}>
            <div className={styles['mv-right-wrap']}>
              <span className={styles['mv-right-title']}>MV简介</span>
              <p>发布时间：{this.state.mvDetail.publishTime}</p>
              <p>
                播放次数：{this.getPlayCount(this.state.mvDetail.playCount)}次
              </p>
            </div>
            <MVRecommend
              history={this.props.history}
              relatedVideo={this.state.relatedVideo}
            ></MVRecommend>
            <SideDownload></SideDownload>
          </div>
        </div>
      </div>
    );
  }
}
