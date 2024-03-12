import React, { useEffect , useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  // articles = [
  //   {
  //     "source": { "id": "news-com-au", "name": "News.com.au" },
  //     "author": "Andrew McMurtry",
  //     "title": "Aussies’ ‘horrible’ World Cup truth exposed",
  //     "description": "Welcome to news.com.au’s live coverage of the Cricket World Cup match between Australia and the Netherlands.",
  //     "url": "https://www.news.com.au/sport/cricket/cricket-world-cup-2023-australia-vs-netherlands-live/news-story/fcc22dd794a77e6de5fc791cbd551d19",
  //     "urlToImage": "https://content.api.news/v3/images/bin/7ff92ddac0c44d32ee707d5b5e793f82",
  //     "publishedAt": "2023-10-25T08:32:00Z",
  //     "content": "Welcome to news.com.au’s live coverage of the Cricket World Cup match between Australia and the Netherlands.\r\nAustralia has bounced back from a horror start to the World Cup with two convincing wins … [+2789 chars]"
  //   },
  //   {
  //     "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
  //     "author": null,
  //     "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //     "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //     "publishedAt": "2020-04-27T11:41:47Z",
  //     "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //   },
  //   {
  //     "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
  //     "author": null,
  //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     "publishedAt": "2020-03-30T15:26:05Z",
  //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //   }
  // ]

  // //for class based here and for function based go downside
  // static defaultProps = {
  //   country : 'in' , 
  //   pageSize: 8 ,
  //   category : 'general'
  // }

  // static propTypes = {
  //   country : PropTypes.string,
  //   pageSize : PropTypes.number,
  //   category : PropTypes.string
  // }
  

  const capitalizefirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const[articles , setArticles] = useState([]);
  const[loading , setLoading] = useState(true);
  const[page , setPage] = useState(1);
  const[totalResults , setTotalResults] = useState(0);

  // //for class based here and for function based see usestate
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     // articles : this.articles , 
  //     articles : [] , 
  //     loading : true , 
  //     page : 1,
  //     totalResults : 0
  //   }
  //   document.title = `${this.capitalizefirstletter(props.category)} - NewsMonkey`
  // }

  const updatenews = async() =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({loading:true})
    setLoading({loading:true})
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(50);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false)
    // //class based downside and functon based upside
    // this.setState({
    //   articles : parsedData.articles , 
    //   totalResults : parsedData.totalResults , 
    //   loading : false
    // })
    props.setProgress(100);
  }

  useEffect(() => {
    updatenews();
    // eslint-disable-next-line
  document.title = `${capitalizefirstletter(props.category)} - NewsMonkey`
  }, [])
  // //class based downside and functon based upside
  // const componentDidMount = async() => {
  //   this.updatenews();
  // }


  // const handlePrevClick = async() => {
  //   // this.setState({
  //   //   page: this.state.page - 1
  //   // })
  //   setPage(page - 1);
  //   updatenews()
  // }

  // const handleNextClick = async() => {
  //   // if(this.state.page + 1 >Math.ceil(this.state.totalResults/props.pageSize)){
  //   // }
  //   // else{
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${this.apiKey}&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  //   //   this.setState({loading:true})
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();
  //   //   console.log(parsedData);
  //   //   this.setState({
  //   //     articles : parsedData.articles , 
  //   //     page : this.state.page + 1 ,
  //   //     loading:false
  //   //   })
  //   // }
  //   // this.setState({
  //   //   page: this.state.page + 1
  //   // })
  //   setPage(page + 1);
  //   updatenews()
  // }


  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    // this.setState({page : page + 1})
      // this.setState({loading:true})
      setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      // this.setState({
      // articles : articles.concat(parsedData.articles) , 
      // totalResults : parsedData.totalResults , 
      // loading : false
      // })
  };


    return (
      <>
        <h1 className='text-center'>NewsMonkey - Top HeadLines on {capitalizefirstletter(props.category)} category</h1>
        {loading&&<Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {/* {!this.state.loading&&this.state.articles.map((element)=>{ */}
              {articles.map((element)=>{
                return <div key = {element.url} className="col-md-4">
                  <NewsItem title = {element.title?element.title:""} description = {element.description?element.description:""} imageUrl = {element.urlToImage?element.urlToImage:"https://images.hindustantimes.com/tech/img/2023/10/26/1600x900/g40eb_1694271741677_1698296067592.jpg"} newsUrl = {element.url} author={element.author} date={element.publishedAt} source = {element.source.name}/>
                  {/* <NewsItem title = {element.title.slice(0 , 40)} description = {element.description.slice(0 , 88)} imageUrl = {element.urlToImage} newsUrl = {element.url}/> */}
                </div>
              })}
            </div>
          </div>

        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 >Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        
      </>
    )
}


News.defaultProps = {
  country : 'in' , 
  pageSize: 8 ,
  category : 'general'
}

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}
export default News;