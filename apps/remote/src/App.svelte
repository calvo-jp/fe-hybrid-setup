<script lang="ts">
  interface IApp {
    id: string;
    slug: string;
    name: string;
    description: string;
    cover: {
      url: string;
      width: number;
      height: number;
    };
  }

  export let data: IApp | undefined = undefined;
</script>

{#if data}
  <div class="max-w-[900px] mx-auto p-[4rem]">
    <div>
      <h1 class="font-serif text-4xl font-bold">{data.name}</h1>
      <p class="text-neutral-800">{data.description}</p>

      <div class="mt-4 w-fit flex overflow-hidden">
        <img
          class="max-w-full max-h-[400px]"
          src={data.cover.url}
          alt={data.name}
          draggable="false"
        />
      </div>
    </div>
  </div>
{/if}
