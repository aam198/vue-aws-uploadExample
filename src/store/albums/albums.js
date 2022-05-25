// import { createAlbum } from '../../graphql/mutations';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import {createAlbum as createAlbumMutation } from '@/graphql/mutations';
import { getAlbum as getAlbumQuery } from '@/graphql/queries';
import { listAlbums as listAlbumsQuery } from '@/graphql/queries';
import { createPhoto as createPhotoMutation} from '@/graphql/mutations';
import { v4 as uuid } from 'uuid';
import awsconfig from '@/aws-exports';



export const albumInfo ={
  namespaced: true,
  state: { albums: null },
  mutations: {
    setAlbums(state, payload) {
        state.albums = payload;
    }
  },
  actions: {
    async createAlbum({ dispatch }, newAlbum) {
        try {
            await API.graphql(graphqlOperation(createAlbumMutation, { input: newAlbum }))

            dispatch("getAlbumsData");

        } catch (error) {
            console.error("createalbum", error)


        }
    },
    async getAlbum(_, albumId) {
        return await API.graphql(
            graphqlOperation(getAlbumQuery, { id: albumId })
        )
    },
    async getAlbumsData({ commit }) {
        const albumsData = await API.graphql(graphqlOperation(listAlbumsQuery));
        commit("setAlbums", albumsData.data.listAlbums.items);
    },
    async createPhoto(_, data) {
        const {
            aws_user_files_s3_bucket_region: region,
            aws_user_files_s3_bucket: bucket
        } = awsconfig;
        const { file, type: mimeType, id } = data;
        const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
        const photoId = uuid();
        const key = `images/${photoId}.${extension}`;
        const inputData = {
            id: photoId,
            photoAlbumId: id,
            contentType: mimeType,
            fullsize: {
                key,
                region,
                bucket
            }
        }

        //s3 bucket storage add file to it
        try {
            await Storage.put(key, file, {
                level: "protected",
                contentType: mimeType,
                metadata: { albumId: id, photoId }
            })
            await API.graphql(
                graphqlOperation(createPhotoMutation, { input: inputData })
            )
            return Promise.resolve("success");


        } catch (error) {
            console.log("createPhoto error", error)
            return Promise.reject(error);

        }
    }

},
  // actions: {
  //   // to createAlbum
  //   async createAlbum( { dispatch } , newAlbum){
  //     try {
  //       await API.graphql(graphqlOperation(createAlbumMutation, {input: newAlbum}))
  //       // Automatically updates the page when a user selects create Album Button
  //       dispatch("getAlbumsData")
  //     }
  //     catch (error){
  //       console.error("createalbum", error)
  //     }
  //   },
  //   // getting the album 
  //   async getAlbum(_, albumId) {
  //     return await API.graphql(
  //         graphqlOperation(getAlbumQuery, { id: albumId })
  //     )
  //   },
  //   async getAlbumsData({ commit }) {
  //       const albumsData = await API.graphql(graphqlOperation(listAlbumsQuery));
  //       commit("setAlbums", albumsData.data.listAlbums.items);
  //   },
  //   async createPhoto(_, data) {
  //     // destructing and grabbing stuff from aws-config file
  //     const {
  //       aws_user_files_s3_bucket_region: region,
  //       aws_user_files_s3_bucket: bucket } = awsconfig;

  //     // Getting information from data
  //     const { file, type: mimeType, id } = data;
  //     const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
  //     const photoId = uuid();
  //     // TODO: possibly update ${photoId} to file.name
  //     const key = `images/${photoId}.${extension}`;

  //     // Everything that goes into graphql query
  //     const inputData = {
  //       id: photoId,
  //       photoAlbumId: id,
  //       contentType: mimeType,
  //       fullsize: {
  //         key: key,
  //         region: region, 
  //         bucket: bucket
  //       }
  //     }

  //     // S3 bucket storage and then add file to it
  //     try {
  //       await Storage.put(key, file, {
  //         level: "protected",
  //         contentType: mimeType,
  //         metadata: { albumId: id, photoId }
  //       })
  //       // If that is successful then inputData that was created above: 
  //       await API.graphql (
  //         graphqlOperation(createPhotoMutation, { input: inputData })
  //       )
  //       return Promise.resolve("success");
  //     }
  //     catch (error) {
  //       console.log("createPhoto error", error)
  //       return Promise.reject(error);
  //     }
      
  //   }
  // },
  getters: {
    // Setting the albums
    albums: (state) => state.albums
  }
}