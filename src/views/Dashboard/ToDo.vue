<script>
import { mapActions, mapState } from "pinia";
import d$todo from "@/stores/dashboard/todo";

export default {
  name: "ToDo",
  computed: {
    ...mapState(d$todo, ["g$list"]),
  },
  methods: {
    ...mapActions(d$todo, ["a$list"]),
    async getlist() {
      try {
        await this.a$list();
      } catch (e) {
        console.error("methods getlist error", e);
      }
    },
  },
  async created() {
    await this.getlist();
  },
};
</script>
