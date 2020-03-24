<template>
  <v-card class="roomsOverlay" dark flat tile>
    <v-container class="pa-0 pl-4">
      <v-row>
        <v-col cols="12" class="pl-0">
          <v-icon>{{
            soloChatsToggle ? "mdi-chevron-down" : "mdi-chevron-right"
          }}</v-icon>
          <span class="font-weight-black body-2">Traders</span>
        </v-col>
      </v-row></v-container
    >
    <v-divider />
    <v-list v-show="soloChatsToggle" class="pa-0" dense color="transparent">
      <v-list-item-group v-model="soloChatsModel" color="success">
        <v-list-item
          v-for="room in soloChatsList"
          :key="room.roomId"
          class="roomList__list-item"
          :ripple="false"
          @click="
            selectRoom({
              roomId: room.roomId,
              displayName: room.name,
              avatarUrl: room.avatar_url
            })
          "
        >
          <v-list-item-icon class="roomList__item-icon">
            <v-avatar size="30">
              <v-img :src="room.avatar_url"></v-img>
            </v-avatar>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="body-2"
              v-text="room.name"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-container class="pa-0 pl-4">
      <v-row>
        <v-col cols="12" class="pl-0">
          <v-icon>{{
            communitiesListToggle ? "mdi-chevron-down" : "mdi-chevron-right"
          }}</v-icon>
          <span class="font-weight-black body-2">Communities</span>
        </v-col>
      </v-row></v-container
    >

    <v-divider />
    <v-list
      v-show="communitiesListToggle"
      class="pa-0"
      dense
      color="transparent"
    >
      <v-list-item-group v-model="communitiesModel" color="success">
        <v-list-item
          v-for="community in communitiesList"
          :key="community.roomId"
          :ripple="false"
          class="roomList__list-item"
          @click="
            selectRoom({
              roomId: community.roomId,
              displayName: community.name,
              avatarUrl: community.avatar_url
            })
          "
        >
          <v-list-item-icon class="roomList__item-icon">
            <v-avatar size="30">
              <v-img :src="community.avatar_url"></v-img>
            </v-avatar>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="body-2"
              v-text="community.name"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { client } from "~/assets/js/vyndue/client.js";
export default {
  data() {
    return {
      soloChatsToggle: true,
      communitiesListToggle: true,
      invitesList: [],
      soloChatsList: [],
      communitiesList: [],
      allRooms: [],
      invitesModel: [],
      soloChatsModel: [],
      communitiesModel: []
    };
  },
  computed: {
    ...mapGetters({
      clientIsPrepared: "vyndue/getClientIsPrepared",
      currentRoom: "vyndue/getCurrentRoom",
      user: "vyndue/getUser"
    })
  },
  watch: {
    /**
     * Check if client is prepared before executing getRoomList() method
     *
     * @return
     */
    clientIsPrepared() {
      if (this.clientIsPrepared) {
        this.getRoomList();
      }
    }
  },
  mounted() {
    this.getRoomList();
  },
  methods: {
    ...mapActions({
      setCurrentRoom: "vyndue/setCurrentRoom"
    }),
    /**
     * SDK implementation works by getting ALL joined rooms, whether it's a 'community' room or
     * a chatroom with only 2 users.
     *
     * getRooms() function only retrieves ID of all joined rooms.
     *
     * - Iterate through entire array of room ID's
     * - Construct a room class for each individual room
     * - If room only has 2 members, that means the avatar_url of the room should be the
     * profile image of the user you're chatting to.
     * - else use getAvatarUrl method to retrieve avatar_url of specific room
     *
     * Retrieval of invites to rooms works by getting all known rooms (including invites)
     * then getting a list of joined rooms. The difference between those two arrays will be the rooms
     * current user is invited to.
     * @return
     */
    async getRoomList() {
      this.soloChatsList = [];
      this.allRooms = [];
      this.communitiesList = [];
      this.invitesList = [];

      let allRoomsById = [];
      let joinedRooms = await client.getJoinedRooms();
      joinedRooms = joinedRooms.joined_rooms;
      client.getRooms().forEach(room => {
        allRoomsById.push(room.roomId);
      });
      let invitedRooms = allRoomsById.filter(x => !joinedRooms.includes(x));

      //Filter out invites from Rooms list
      joinedRooms = joinedRooms.filter(x => allRoomsById.includes(x));
      invitedRooms.forEach(room => {
        const invitedRoom = client.getRoom(room);
        invitedRoom.avatar_url = invitedRoom.getAvatarUrl(
          client.getHomeserverUrl(),
          40,
          40,
          "crop"
        );
        this.invitesList.push(invitedRoom);
      });

      joinedRooms.forEach((room, index) => {
        this.allRooms[index] = client.getRoom(room);
        let members = Object.entries(this.allRooms[index].currentState.members);

        //If members length is only 2, that means it's a Direct Message
        if (members.length == 2) {
          this.soloChatsList.push(this.allRooms[index]);
          members.forEach(member => {
            if (member[1].name == this.allRooms[index].name) {
              this.allRooms[index].avatar_url = client.getUser(
                member[1].userId
              ).avatarUrl;
              const avatar_url = client.mxcUrlToHttp(
                this.allRooms[index].avatar_url,
                40,
                40,
                "crop"
              );
              this.allRooms[index].avatar_url = avatar_url
                ? avatar_url
                : "/default.png";
            } else {
              this.allRooms[index].avatar_url = "/default.png";
            }
          });
        }
        //If members is only 1 that means it's most probably an 'empty room'
        else if (members.length == 1) {
          this.allRooms[index].avatar_url = "/default.png";
          this.communitiesList.push(this.allRooms[index]);
        }
        //If it reaches this condition then that means it's a group chat/community
        else {
          const avatarUrl = this.allRooms[index].getAvatarUrl(
            client.getHomeserverUrl(),
            40,
            40,
            "crop"
          );
          this.allRooms[index].avatar_url = avatarUrl.includes(
            "unstable/identicon"
          )
            ? "/default.png"
            : avatarUrl;
          this.communitiesList.push(this.allRooms[index]);
        }
      });
    },
    /**
     * Handles user clicks when selecting a room from room list.
     * Sets vuex 'currentRoom' value
     *
     * @param   {Object}  room  contains roomId, displayName and avatarUrl of room
     *
     * @return
     */
    selectRoom(room) {
      this.soloChatsModel = false;
      this.communitiesModel = false;
      this.invitesModel = false;
      this.setCurrentRoom({
        roomId: room.roomId,
        displayName: room.displayName,
        avatarUrl: room.avatarUrl
      });
      this.$emit("close");
      localStorage.setItem("last_room_id", room.roomId);
    }
  }
};
</script>

<style>
/* Background-color hex code is temporary only, waiting until design team decides  */
.roomsOverlay {
  background-color: #222225 !important;
  position: absolute;
  height: 100%;
  top: 0;
  left: -13px;
  border-top-left-radius: 20px !important;
  border-bottom-left-radius: 3px;
  transition: 3s;
}
</style>
