<script lang="ts">
  import './tailwind.css';

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

  let deleting = false;

  const deleteApp = async () => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  };
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

      <button
        class="bg-white border border-sky-300 mt-6 px-4 py-3 rounded-sm text-sky-500 hover:border-sky-400 hover:bg-sky-50 transition-all duration-300 outline-none focus:border-sky-400 focus:bg-sky-50 disabled:border-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed disabled:bg-white"
        disabled={deleting}
        on:click={async () => {
          try {
            deleting = true;
            await deleteApp();
            window.location.href = 'http://localhost:3000';
          } catch {
          } finally {
            deleting = false;
          }
        }}
      >
        {deleting ? 'Loading...' : 'Delete app'}
      </button>
    </div>
  </div>
{/if}
