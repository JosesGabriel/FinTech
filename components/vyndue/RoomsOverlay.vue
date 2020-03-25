<template>
  <v-card class="roomsOverlay" dark flat tile>
    <div class="pa-4">
      <v-icon color="success" small>mdi-message-text</v-icon>
      <span class="font-weight-black pl-2">Vyndue</span>
    </div>
    <v-divider></v-divider>
    <v-container class="pa-0 pl-4">
      <v-row>
        <v-col cols="12" class="pl-0 d-flex justify-space-between">
          <span class="font-weight-black body-2 pl-2">Private Messages</span>

          <v-dialog v-model="startChatDialog" persistent max-width="400">
            <template v-slot:activator="{ on }">
              <v-btn
                class="roomOverlay__button mr-4"
                outlined
                fab
                color="success"
                v-on="on"
              >
                <v-icon>mdi-message-plus-outline</v-icon>
              </v-btn>
            </template>
            <StartChat
              @close="startChatDialog = false"
              @getRooms="getRoomList(), (startChatDialog = false)"
            />
          </v-dialog>
        </v-col> </v-row
    ></v-container>
    <v-list
      v-show="soloChatsToggle"
      class="pa-0"
      dense
      color="transparent soloChats__list"
    >
      <v-list-item-group v-model="soloChatsModel" color="success">
        <v-list-item
          v-for="room in soloChatsList"
          :key="room.roomId"
          :ripple="false"
          @click="
            selectRoom({
              roomId: room.roomId,
              displayName: room.name,
              avatarUrl: room.avatar_url
            })
          "
        >
          <v-list-item-icon class="mr-2">
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
    <v-divider class="mt-2" />
    <v-container class="pa-0 pl-4">
      <v-row>
        <v-col cols="12" class="pl-0 d-flex justify-space-between">
          <span class="font-weight-black body-2 pl-2">{{
            communitiesListToggle ? "Chat Rooms" : "Public Rooms"
          }}</span>
          <v-btn
            class="roomOverlay__button mr-4"
            outlined
            fab
            color="success"
            @click="
              (communitiesListToggle = !communitiesListToggle), getPublicRooms()
            "
          >
            <v-icon>{{
              communitiesListToggle ? "mdi-magnify" : "mdi-close"
            }}</v-icon>
          </v-btn>
        </v-col>
      </v-row></v-container
    >
    <v-list
      v-show="communitiesListToggle"
      class="pa-0 communities__list"
      dense
      color="transparent"
    >
      <v-list-item-group v-model="communitiesModel" color="success">
        <v-list-item
          v-for="community in communitiesList"
          :key="community.roomId"
          :ripple="false"
          @click="
            selectRoom({
              roomId: community.roomId,
              displayName: community.name,
              avatarUrl: community.avatar_url
            })
          "
        >
          <v-list-item-icon class="mr-2">
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

    <v-list
      v-show="!communitiesListToggle"
      class="pa-0 communities__list"
      dense
      color="transparent"
    >
      <v-list-item-group v-model="communitiesModel" color="success">
        <v-list-item
          v-for="room in publicRooms"
          :key="room.room_id"
          :ripple="false"
        >
          <v-list-item-icon class="mr-2">
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
          <v-list-item-action class="my-0">
            <v-btn
              depressed
              x-small
              color="success black--text"
              @click="accessRoom(room)"
              >{{ room.joined ? "View" : "Join" }}</v-btn
            >
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <div class="d-flex justify-center mr-2">
      <v-btn
        bottom
        absolute
        text
        small
        color="success"
        @click="redirectToVyndue()"
        >Open Vyndue</v-btn
      >
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { client } from "~/assets/js/vyndue/client.js";
import StartChat from "~/components/vyndue/StartChat";
export default {
  components: {
    StartChat
  },
  data() {
    return {
      soloChatsToggle: true,
      communitiesListToggle: true,
      publicRooms: [],
      invitesList: [],
      soloChatsList: [],
      communitiesList: [],
      allRooms: [],
      invitesModel: [],
      soloChatsModel: [],
      communitiesModel: [],
      startChatDialog: false
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
     * fires when user clicks 'Open Vyndue' button
     *
     * @return
     */
    redirectToVyndue() {
      window.location.href = process.env.VYNDUE_URL;
    },
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
    },
    /**
     * Retrieve list of public rooms, fires when user clicks button besides 'Chat Room'
     *
     * @return
     */
    async getPublicRooms() {
      let joinedRooms = await client.getJoinedRooms();
      joinedRooms = joinedRooms.joined_rooms;
      client.publicRooms(
        function(err, data) {
          this.publicRooms = data.chunk;
          this.publicRooms.forEach((community, i) => {
            community.joined = false;
            joinedRooms.forEach(joinedRoom => {
              if (community.room_id === joinedRoom) {
                community.joined = true;
              }
            });

            const room = client.getRoom(community.room_id);
            if (room) {
              const avatarUrl = room.getAvatarUrl(
                client.getHomeserverUrl(),
                40,
                40,
                "crop"
              );
              community.avatar_url = avatarUrl.includes("unstable/identicon")
                ? "/default.png"
                : avatarUrl;
            } else {
              community.avatar_url = "/default.png";
            }
          });
        }.bind(this)
      );
    },
    /**
     * Fires when user clicks either 'View' or 'Join' button on Public rooms list
     *
     * @param   {object}  room
     *
     * @return
     */
    accessRoom(room) {
      if (!room.joined) {
        client.joinRoom(room.room_id);
      }
      this.setCurrentRoom({
        roomId: room.room_id,
        displayName: room.name,
        avatarUrl: room.avatar_url
      });
      this.$emit("close");
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
  left: -12px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  transition: 3s;
}
.roomOverlay__button {
  height: 20px !important;
  width: 20px !important;
}
.roomOverlay__button span i {
  font-size: 12px !important;
  height: 20px !important;
  width: 20px !important;
}
.communities__list {
  height: 170px;
  overflow: auto;
}
.soloChats__list {
  height: 120px;
  overflow: auto;
}
</style>
